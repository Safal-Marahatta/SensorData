# models.py
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from database import Base

class Sensor(Base):
    __tablename__ = "sensor"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)            # Sensor name
    modbus_setting = Column(String)              # Modbus setting
    polling_setting = Column(String)             # Polling settings
    
    # One-to-many relationship: one sensor can have many sensor data entries.
    data = relationship("SensorData", back_populates="sensor")


class SensorData(Base):
    __tablename__ = "sensordata"
    
    dataid = Column(Integer, primary_key=True, index=True)  # Primary key for sensor data
    value = Column(Float)                                     # Sensor reading value
    sensorid = Column(Integer, ForeignKey("sensor.id"))       # Foreign key to sensor table
    timestamp = Column(DateTime)                              # Timestamp of the reading

    # Relationship back to Sensor.
    sensor = relationship("Sensor", back_populates="data")
