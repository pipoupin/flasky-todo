import sqlite3

def connect():
    return sqlite3.connect('tasks.db')

def create_table():
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("""CREATE TABLE tasks (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        content TEXT NOT NULL,
                        checked INTEGER NOT NULL,
                        canceled INTEGER NOT NULL
                    );""")
    conn.commit()
    conn.close()

def valid_task_id(task):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("SELECT tasks WHERE id = ?", task[0])
    response = bool(cursor.fetchall())
    conn.close()
    return response


def update_tasks(tasks):
    conn = connect()
    cursor = conn.cursor()
    cursor.executemany("""UPDATE tasks SET content = ?, checked = ?, canceled = ? WHERE id = ?""", ((task[1], task[2], task[3], task[0]) for task in tasks))
    conn.commit()
    conn.close()

def create_tasks(tasks):
    conn = connect()
    cursor = conn.cursor()
    cursor.executemany("""INSERT INTO tasks (content, checked, canceled)
                     VALUES (?,?,?)""", ((task[1], task[2], task[3]) for task in tasks))
    ids = []
    for task in tasks:
        cursor.execute("SELECT id FROM tasks WHERE content = ?", (task[1],))
        row = cursor.fetchone()
        if row:
            ids.append(row[0])
    response = cursor.fetchall()
    conn.commit()
    conn.close()
    return ids

def get_tasks(username=None):
    conn = connect()
    cursor = conn.cursor()
    cursor.execute("""SELECT * FROM tasks ORDER BY id ASC""")
    response = cursor.fetchall()
    conn.close()
    return response

def delete_tasks(tasks):
    print(tasks )
    conn = connect()
    cursor = conn.cursor()
    cursor.executemany("""DELETE FROM tasks WHERE id=?""",((task[0],) for task in tasks))
    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_table()