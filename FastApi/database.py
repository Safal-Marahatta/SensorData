from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Define SQLite database URL
DATABASE_URL = "sqlite:///./sensors.db"

# Create a database engine
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create a session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
