#sensor name=sensor name
#


import struct
from pymodbus.client import ModbusSerialClient as ModbusClient
from pymodbus.exceptions import ModbusIOException

import MySQLdb  # This is the MySQL client library for mysqlclient
from datetime import datetime, timedelta
import time

# Database configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'IES@Mysql2025',
    'db': 'dams_db',
}


def read_general_settings():
    """
    Retrieve general settings from the database.
    Returns a list of dictionaries, where each dictionary contains settings for a sensor.
    """
    try:
        conn = MySQLdb.connect(**db_config)  # Connection using mysqlclient
        cursor = conn.cursor(MySQLdb.cursors.DictCursor)  # Using DictCursor for dictionary results
        query = "SELECT * FROM general_settings"  # Assuming a table named 'general_settings'
        cursor.execute(query)
        general_settings = cursor.fetchall()
        for row in general_settings:
            print(row)
        
        cursor.close()
        conn.close()
        return general_settings
    except MySQLdb.Error as err:
        print(f"Database error: {err}")
        return []

def read_modbus_settings():
    """
    Retrieve modbus settings from the database.
    Returns a list of dictionaries, where each dictionary contains settings for a sensor.
    """
    try:
        conn = MySQLdb.connect(**db_config)  # Connection using mysqlclient
        cursor = conn.cursor(MySQLdb.cursors.DictCursor)  # Using DictCursor for dictionary results
        query = "SELECT * FROM modbus_settings" 
        cursor.execute(query)
        modbus_settings = cursor.fetchall()
        cursor.close()
        conn.close()
        return modbus_settings
    except MySQLdb.Error as err:
        print(f"Database error: {err}")
        return []

def setup_modbus(port, baudrate, bytesize, parity, stopbits):
    """
    Set up and configure a modbus client.
    """
    # Create a Modbus client
    client = ModbusClient(
        port=port,
        baudrate=baudrate,
        parity=parity,
        stopbits=stopbits,
        bytesize=bytesize,
    )
    return client

def read_sensor_data(client, slave_id, function_code, variable_type, register_address, register_count, multiplier, offset):
    """
    Read data from a sensor register and apply the formula: data * multiplier + offset.
    """
    try:
        if variable_type=="Integer":
            raw_value = client.read_register(address=register_address,count=register_count,slave=slave_id)
            real_value = raw_value * multiplier + offset
        elif variable_type=="Float":
            raw_value = client.read_register(address=register_address,count=register_count,slave=slave_id)
            real_value = raw_value * multiplier + offset
        elif variable_type=="Swap Float":
            raw_value = client.read_register(address=register_address,count=register_count,slave=slave_id)
            real_value = raw_value * multiplier + offset
        else:
            print("Invalid variable type")
            real_value = None
        
        return real_value
    except Exception as e:
        print(f"Error reading register {register_address}: {e}")
        return None

def store_batch_data_in_db(batch_data):
    """
    Store a batch of sensor readings in the database.
    """
    try:
        conn = MySQLdb.connect(**db_config)  # Connection using mysqlclient
        cursor = conn.cursor()
        query = "INSERT INTO SensorData (sensor_id, sensor_parameter, value, timestamp) VALUES (%s, %s, %s, %s)"
        cursor.executemany(query, batch_data)  # Batch insert
        conn.commit()
        cursor.close()
        conn.close()
        print(f"Stored {len(batch_data)} records in the database.")
    except MySQLdb.Error as err:
        print(f"Database error: {err}")

def store_batch_raw_data_in_db(batch_data):
    """
    Store a batch of sensor readings in the database.
    """
    try:
        conn = MySQLdb.connect(**db_config)  # Connection using mysqlclient
        cursor = conn.cursor()
        query = "INSERT INTO SensorRawData (sensor_id, sensor_parameter, value, timestamp) VALUES (%s, %s, %s, %s)"
        cursor.executemany(query, batch_data)  # Batch insert
        conn.commit()
        cursor.close()
        conn.close()
        print(f"Stored {len(batch_data)} records in the database.")
    except MySQLdb.Error as err:
        print(f"Database error: {err}")

def calculate_next_logging_time(log_interval):
    """
    Calculate the next logging time based on the current time and the logging interval.
    """
    now = datetime.now()
    # Calculate the next logging time by rounding up to the nearest interval
    next_time = now + timedelta(minutes=(log_interval - now.minute % log_interval))
    next_time = next_time.replace(second=0, microsecond=0)  # Synchronize to the start of the minute
    return next_time

def main():
    # Retrieve sensor settings from the database
    general_settings = read_general_settings()
    if not general_settings:
        print("No general settings found in the database.")
        return
    
    # Set up modbus client for each sensor
    clients = []
    for general_setting in general_settings:
        log_interval = general_setting["log_interval"]
        poll_interval = general_setting["poll_interval"]
        client = setup_modbus(
            port=general_setting["com_port"],
            baudrate=general_setting['baud_rate'],
            bytesize=general_setting['byte_size'],
            parity=general_setting['parity'],
            stopbits=general_setting['stopbit'],
            # timeout=general_setting['timeout']
        )
        
        clients.append((client, general_setting))

    # Retrieve modbus communication data
    modbus_settings = read_modbus_settings()
    
    # Initialize variables for logging
    next_logging_time = calculate_next_logging_time(log_interval)
    print(f"Next logging time: {next_logging_time}")

    # Main loop to read and log sensor data
    batch_data = []
    
    while True:
        try:
            for modbus_setting in modbus_settings:
                for client, sm_setting in clients:
                    if sm_setting["station_id"] == modbus_setting["sensor_id"]:
                        client = client
                        sm_setting = sm_setting
                        break

                sensor_reading = read_sensor_data(
                    client,
                    modbus_setting['slave_id'],
                    modbus_setting['sensor_id'],
                    modbus_setting['variable'],
                    modbus_setting['register_address'],
                    modbus_setting['register_count'],
                    modbus_setting['multiplier'],
                    modbus_setting['offset']
                )
            
                cur_time = datetime.now()
                cur_timestamp = cur_time.strftime("%Y-%m-%d %H:%M:%S")

                if sensor_reading is not None:
                    # Append the data to the batch
                    batch_data.append((sm_setting['sensor_id'], modbus_setting['variable'], sensor_reading, cur_timestamp))

                    # Print the data for debugging
                    print(f"Sensor {sm_setting['station_id']} - {modbus_setting['variable']}: {sensor_reading}, Time: {cur_timestamp}")

            # Store data in the database if the batch size is reached
            if len(batch_data) >= 10:  # Example: Store every 10 records
                store_batch_data_in_db(batch_data)
                batch_data = []  # Reset the batch

            # Check if it's time to log the data
            if datetime.now() >= next_logging_time:
                # Store data in the database
                store_batch_data_in_db(batch_data)

                # Calculate the next logging time
                next_logging_time = calculate_next_logging_time(log_interval)
                print(f"Next logging time: {next_logging_time}")

            # Store data in the database
            store_batch_raw_data_in_db(batch_data)
            # Sleep for the polling interval (retrieved from settings)
            time.sleep(sm_setting['poll_interval'])

        except KeyboardInterrupt:
            print('End!!! Keyboard Interrupted')
            break

    # Store any remaining data in the batch before exiting
    if batch_data:
        store_batch_data_in_db(batch_data)

if __name__ == "__main__":
    main()
