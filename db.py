import sqlite3

conn = sqlite3.connect('tasks.db', check_same_thread=False)

c = conn.cursor()

def get_from_db():
    global c
    c.execute("""SELECT content, checked, canceled FROM tasks""")
    return c.fetchall()

def load_to_db(tasks):
    global c
    c.execute("""DELETE FROM tasks""")
    for task in tasks:
        print(task[0], 1 if task[1] else 0, 1 if task[2] else 0)
        c.execute(""" INSERT INTO tasks (content, checked, canceled)
                  VALUES (?,?,?)  """, (task[0], 1 if task[1] else 0, 1 if task[2] else 0))

def close_db():
    global conn
    conn.commit()
    conn.close()