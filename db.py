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


def update_task(task):
    conn = connect()
    cursor = conn.cursor()

    if task[0]:
        cursor.execute("UPDATE tasks SET content = ?, checked = ?, canceled = ? WHERE id = ?", (task[1], task[2], task[3], task[0]))
        conn.commit()
    
    conn.close()

def create_task(task):
    conn = connect()
    cursor = conn.cursor()
    print(task)

    if int(task[0]) == 0:
        cursor.execute("INSERT INTO tasks (content, checked, canceled) VALUES (?,?,?)", task[1:4])
        id = cursor.lastrowid
        conn.commit()
    else:
        print('hmm')
        id = 0

    conn.close()
    return id

def get_tasks(username=None):
    conn = connect()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM tasks ORDER BY id ASC")
    response = cursor.fetchall()

    conn.close()
    return response

def delete_task(task):
    conn = connect()
    cursor = conn.cursor()

    cursor.execute("DELETE FROM tasks WHERE id=?", (task[0],))

    conn.commit()
    conn.close()

if __name__ == "__main__":
    create_table()
