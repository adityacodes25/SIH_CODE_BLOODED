import mysql.connector
import random
from datetime import datetime, timedelta
from faker import Faker

fake = Faker('en_IN')

# Update 'password' if your local MySQL root user has a password set!
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'sql_root', 
    'database': 'soip'
}

try:
    conn = mysql.connector.connect(**db_config)
    cursor = conn.cursor()
    print("Connected to MySQL database successfully.")
except mysql.connector.Error as err:
    print(f"Error connecting to MySQL: {err}")
    exit(1)

def seed_database(num_trainees=500):
    print("Starting database population...")

    # Clear existing data in foreign-key safe order
    tables = [
        "follow_up", "wage_records", "retention_records", "employment_records",
        "outcome_assessment", "trainee_skills", "training_enrollments",
        "course_skills", "skills", "courses", "training_providers", "trainee"
    ]
    for table in tables:
        cursor.execute(f"DELETE FROM {table};")
    conn.commit()

    # 1. Seed Training Providers
    providers = []
    provider_types = ['NSDC Partner', 'ITTI', 'Private Institute', 'Government Center']
    states = ['Delhi', 'Maharashtra', 'Karnataka', 'Uttar Pradesh', 'Tamil Nadu']
    for i in range(1, 11):
        p_id = f"PRV{i:03d}"
        providers.append(p_id)
        cursor.execute(
            "INSERT INTO training_providers (Provider_ID, Provider_Name, Provider_Type, Registration_Number, Phone, State, District, Contact_Person, Status) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (p_id, f"{fake.company()} Skills Center", random.choice(provider_types), f"REG{random.randint(10000,99999)}", 987654321, random.choice(states), fake.city(), fake.name(), 'Active')
        )

    # 2. Seed Courses
    courses = []
    course_list = [
        ("Web Development", "IT", "Intermediate", 90),
        ("Data Entry & Management", "IT", "Basic", 45),
        ("CNC Machine Operator", "Manufacturing", "Advanced", 120),
        ("Solar Panel Technician", "Energy", "Intermediate", 60),
        ("Healthcare Assistant", "Healthcare", "Basic", 90)
    ]
    for i, (name, sector, level, duration) in enumerate(course_list, 1):
        c_id = f"CRS{i:03d}"
        courses.append((c_id, name, sector, level, duration))
        cursor.execute(
            "INSERT INTO courses (Course_id, Course_Name, Course_Code, Description, Sector, Skill_Level, Status, Duration_Days) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (c_id, name, f"CODE_{c_id}", f"Course on {name}", sector, level, 'Active', duration)
        )

    # 3. Seed Trainees, Enrollments, Assessments & Employment
    genders = ['Male', 'Female']

    for i in range(1, num_trainees + 1):
        t_id = f"TRN{i:05d}"
        dob = fake.date_of_birth(minimum_age=18, maximum_age=35)
        state = random.choice(states)
        
        # Insert Trainee
        cursor.execute(
            "INSERT INTO trainee (Trainee_ID, Full_Name, Date_Of_Birth, Gender, Phone, EMail, Address, State) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (t_id, fake.name(), dob, random.choice(genders), 987654321, fake.email(), fake.address().replace('\n', ' '), state)
        )

        # Pick random course & provider
        c_id, c_name, sector, level, duration = random.choice(courses)
        p_id = random.choice(providers)
        e_id = f"ENR{i:05d}"
        
        start_date = fake.date_between(start_date='-2y', end_date='-6m')
        end_date = start_date + timedelta(days=duration)
        
        # Attendance & Completion logic
        attendance = random.randint(50, 100)
        completion_status = 'Completed' if attendance >= 70 else 'Dropped Out'
        score = random.randint(40, 98) if completion_status == 'Completed' else random.randint(10, 49)
        cert_status = 'Issued' if completion_status == 'Completed' else 'Not Issued'

        cursor.execute(
            "INSERT INTO training_enrollments (Enrollment_ID, Trainee_ID, Course_id, Provider_ID, Enrollment_Date, Training_Start_Date, Training_End_Date, Completion_Date, Attendance_Percentage, Completion_Status, Assessment_Score, Certificate_Status) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (e_id, t_id, c_id, p_id, start_date - timedelta(days=10), start_date, end_date, end_date, str(attendance), completion_status, str(score), cert_status)
        )

        # Insert Outcome Assessment
        cursor.execute(
            "INSERT INTO outcome_assessment (Assessment_ID, Trainee_ID, Course_id, Assessment_Type, Score, Result, Assessment_Date) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s)",
            (f"ASM{i:05d}", t_id, c_id, 'Final Practical', str(score), 'Pass' if score >= 50 else 'Fail', end_date)
        )

        # Determine Placement (Higher probability if completed with good score)
        placement_probability = 0.85 if (completion_status == 'Completed' and score >= 60) else 0.15
        is_placed = random.random() < placement_probability

        if is_placed:
            emp_id = f"EMP{i:05d}"
            salary = random.randint(12000, 35000)
            cursor.execute(
                "INSERT INTO employment_records (Employment_ID, Trainee_ID, Employment_Status, Employer_Name, Job_Title, Employment_Type, Joining_Date, Location, Starting_Salary, Salary_Period, Verified, Verification_Date) "
                "VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (emp_id, t_id, 'Employed', fake.company(), f"{sector} Specialist", 'Full-Time', end_date + timedelta(days=30), state, salary, 'Monthly', 1, end_date + timedelta(days=40))
            )

    conn.commit()
    print(f"Successfully populated database with {num_trainees} synthetic records!")

    cursor.close()
    conn.close()

if __name__ == '__main__':
    seed_database(500)