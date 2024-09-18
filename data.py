import pandas as pd
import uuid
import random
from faker import Faker
from datetime import datetime, timedelta

# Initialize Faker
fake = Faker()

# Generate unique emails
emails = set()
while len(emails) < 100:
    emails.add(fake.email())

# Generate sample data for the 'guest' table
guest_data = {
    "id": [str(uuid.uuid4()) for _ in range(100)],
    "fullName": [fake.name() for _ in range(100)],
    "email": list(emails),
    "created_at": [fake.date_time_this_decade() for _ in range(100)],
    "phoneNumber": [fake.random_number(digits=10, fix_len=True) for _ in range(100)],
    "DoB": [fake.date_of_birth(minimum_age=18, maximum_age=70) for _ in range(100)],
}

# Create DataFrame for the 'guest' table
guest_df = pd.DataFrame(guest_data)

# Save 'guest' data to CSV
guest_df.to_csv("guest_data.csv", index=False)

# Generate sample data for the 'booking' table (only after 2023)
booking_data = {
    "id": [f"BOOK-{int(datetime.timestamp(fake.date_time_between_dates(datetime_start=datetime(2023, 1, 1), datetime_end=datetime.now())))}-{random.randint(1000, 9999)}" for _ in range(300)],
    "guest_id": [random.choice(guest_data["id"]) for _ in range(300)],
    "cabin_id": [random.choice([1, 2, 3]) for _ in range(300)],
    "booking_date": [fake.date_time_between_dates(datetime_start=datetime(2023, 1, 1), datetime_end=datetime.now()) for _ in range(300)],
    "startDate": [fake.date_between_dates(date_start=datetime(2023, 1, 1), date_end=datetime.now()) for _ in range(300)],
    "endDate": [fake.date_between_dates(date_start=datetime(2023, 1, 1), date_end=datetime.now()) for _ in range(300)],
    "status": [random.choice(["checked-in", "unconfirmed", "checked-out"]) for _ in range(300)],
    "totalPrice": [round(random.uniform(100.0, 10000.0), 2) for _ in range(300)],
    "numGuests": [random.randint(1, 10) for _ in range(300)],
    "numNights": [random.randint(1, 30) for _ in range(300)],
    "created_at": [fake.date_time_between_dates(datetime_start=datetime(2023, 1, 1), datetime_end=datetime.now()) for _ in range(300)],
}

# Create DataFrame for the 'booking' table
booking_df = pd.DataFrame(booking_data)

# Save 'booking' data to CSV
booking_df.to_csv("booking_data.csv", index=False)

print("Sample data generated and saved to 'guest_data.csv' and 'booking_data.csv'")
