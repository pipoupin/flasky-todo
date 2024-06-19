import sqlite3

def connect_db():
    return sqlite3.connect('tasks.db')

def get_from_db():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("""SELECT content, checked, canceled FROM tasks""")
    tasks = cursor.fetchall()
    conn.close()
    return tasks

def load_to_db(tasks):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute("""DELETE FROM tasks""")
    cursor.executemany("""INSERT INTO tasks (content, checked, canceled)
                     VALUES (?,?,?)""", tasks)
    conn.commit()
    conn.close()