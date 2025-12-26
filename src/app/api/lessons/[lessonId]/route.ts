import { NextRequest, NextResponse } from 'next/server';

// Lesson data store
const lessonsData = {
  "1": {
    title: "Introduction to DBMS",
    description: `Database Management Systems (DBMS)

Introduction to DBMS

A Database Management System (DBMS) is a software layer that sits between applications and the stored database, providing the necessary tools and interfaces to manage and interact with the database efficiently.

Role of DBMS

DBMS acts as an intelligent intermediary:

- Data Storage — Data is stored in files; DBMS manages access to these files
- Interface Layer — Acts as an intermediary between end-users/applications and the database
- Query Processing — Provides software to process queries and retrieve data
- Data Management — A collection of programs that manage the database, ensuring smooth data retrieval and storage

Key Features of DBMS

- Easy Data Access — Query, process, access, add, update, and delete data efficiently
- Data Integrity — Ensures stored data is accurate and consistent
- Concurrency Control — Manages simultaneous access by multiple users
- Security — Implements measures to protect data from unauthorized access
- Backup and Recovery — Provides mechanisms for data backup and recovery

Popular DBMS Examples

- MySQL — Open-source relational database management system
- PostgreSQL (pgSQL) — Advanced, open-source relational database known for extensibility and standards compliance
- SQLite — Lightweight, self-contained SQL database engine

SQL: The Common Language

- Structured Query Language (SQL) — Standard language used to interact with relational databases
- Compatibility — Most DBMSs understand and use SQL (implementations may vary slightly)
- Operations — Enables CRUD operations (Create, Read, Update, Delete)

Advantages of DBMS

- Reduced Redundancy — Eliminates duplicate data, saving storage space
- Consistency — Ensures all users see the same data
- Scalability — Supports development of large, scalable applications
- Complex Architectures — Facilitates creation of complex and modern applications
- Data Sharing — Enables easy sharing among multiple users and applications
- Backup and Recovery — Provides robust mechanisms for data protection

Constraints and Security

- Data Constraints — Allows setting rules for data entry
    - Example: Specifying value must be an integer or string of certain length
- Security Measures — Implements access controls and encryption to protect against unauthorized access and breaches

Types of Database Management Systems

Different Ways to Store Data

DBMS systems store data in various structural forms depending on the type:

- Tabular form — Data stored in tables with rows and columns
- Key-value pairs — Data stored as associated pairs of keys and values
- Document-based — Data stored as documents (often in JSON format)

Relational Database Management Systems (RDBMS)

One of the most important and widely used types of DBMS

- Stores data in the form of tables
- Example: MySQL is a popular RDBMS

Structure of RDBMS

1. Tables — Each table represents an entity

- Example entities: Actors, Theaters, Movies

2. Columns — Represent properties/attributes of the entities

- For Actors table: name, age, gender, etc.

3. Rows — Each row represents a unique entity instance (actual data)

- A single actor with their specific attributes

Data Operations in RDBMS

- New data → Creates a new row
- New property → Creates a new column
- New entity type → Creates a new table

The "Relational" in RDBMS

- Tables are related to each other through relationships
- Example: Actors table is related to Movies table
- These relationships connect data across tables
- Core-coupled data (data with many relationships) works well with RDBMS`,
    task: "Read through the concepts of DBMS and RDBMS to understand how databases work.",
    hint: "Remember, RDBMS stores data in tables with rows and columns.",
    initialCode: `-- Welcome to the DBMS Lesson\n-- This is a SQL comment\nSHOW DATABASES;`,
  },
  "2": {
    title: "File Systems vs Databases",
    description: "Before databases, we used file systems. Let's understand the limitations of file systems like data redundancy and inconsistency, and how databases solve these problems.",
    task: "Compare the file system approach with the database approach.",
    hint: "Files are hard to query efficiently.",
    initialCode: `// File System Simulation\nconst fileData = "User: John, Age: 30";\nconsole.log(fileData);`,
  },
  "201": {
    title: "Basic of JavaScript",
    subtopics: [
      {
        title: "JavaScript as a Multi-Paradigm Language",
        content: `JavaScript is a versatile language that supports multiple programming paradigms, allowing developers to choose the best approach for their needs.
Supported Paradigms:
- Functional Programming: Emphasizes the use of functions as the primary building blocks of code. Focuses on pure functions, immutability, and avoiding side effects.
- Procedural Programming: Involves writing code as a series of step-by-step instructions or procedures to achieve a desired outcome.
- Object-Oriented Programming (OOP): Organizes code around objects and classes, which encapsulate data and behavior. Promotes concepts like inheritance, encapsulation, and polymorphism.

Program vs. Process:
- Program: The static set of instructions or code written by a developer.
- Process: An instance of a program under execution; the dynamic state of the code while it is running.

Variables:
- Definition: Containers used to store data values.
- Mutability: Variables can be updated and reused throughout the execution of a program.

Naming Rules for Variables:
Allowed Characters:
- Letters (a-z, A-Z)
- Underscore (_)
- Dollar sign ($)
- Camel case (e.g., myVariableName)

Not Allowed Characters/Rules:
- Digits (cannot start with a digit)
- Special characters (e.g., -, !, @, #, etc.)
- Spaces
- Keywords (reserved words in JavaScript)

Example:
let name = "hazik";
name = "iqram"; // Variable updated

Keywords:
Reserved words in JavaScript that have special meanings and cannot be used as variable names.
Examples: let, const, var, return, if, else, for, while`,
      },
    ],
    task: "Review the notes above. Then, in the playground, declare a variable named 'hero' with the value 'Batman' and log it to the console.",
    hint: "Use 'let' or 'const' to declare variables. Use 'console.log()' to print output.",
    initialCode: `// Write your JavaScript code here\nlet hero = "Batman";\nconsole.log(hero);`,
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  const { lessonId } = await params;

  const lessonData = (lessonsData as Record<string, any>)[lessonId];

  if (!lessonData) {
    return NextResponse.json(
      { error: "Lesson not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(lessonData);
}
