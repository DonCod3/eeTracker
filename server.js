const inquirer = require("inquirer");
// const { getDepartment, addDepartment, deleteDepartment } = require("./routes/department");
// const { getEmployee, addEmployee, deleteEmployee } = require("./routes/employee");
// const { getRoles, addRole, deleteRole } = require("./routes/role");

//establish connection to mySQL
const db = require("./config/connection");


//////////////////                                              CLI prompts/questions
const prompt = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "category",
            message: "Select a category:",
            choices: ["Departments", "Roles", "Employees", "Exit"]
        },
 //Dept. Prompts
        {
            type: "list",
            name: "command",
            messsage: "How do you want to proceed",
            choices: [
                "View all departments",
                "Add a department",
                "Delete a department"
            ],
            when: ({ category }) => {
                if (category === "Departments") {
                    return true;
                } else {
                    return false;
                }
            }
        },
 //Role Prompts
        {
            type: "list",
            name: "command",
            message: "What should you do?",
            choices: [
                "View all roles",
                "Add a role",
                "Delete a role"
            ],
            when: ({ category }) => {
                if (category === "Roles") {
                    return true;
                } else {
                    return false;
                }
            }
        },
//EE Prompts
        {
            type: "list",
            name: "command",
            message: "What should you do?",
            choices: [
                "View all employees",
                "View employees by manager",
                "View employees by department",
                "Add an employee",
                "Update an emplyee",
                "Delete an employee"
            ],
            when: ({ category }) => {
                if (category === "Employees") {
                    return true;
                } else {
                    return false;
                }
            }
        },
    ]).then((response) => {
        switch (response.command) {
            case "View all departments":
                viewDepartments()
                break;

            case "View all roles":
                viewRoles()
                break;

            case "View all employees":
                viewEmployee()
                break;
            
            case "Add a role":
                addRole()
                break;
            
            case "Add an employee":
                addEmployee()
                break;

            default: process.exit()
        }
    })
};


///     VIEW ALL
const viewDepartments = () => {
    db.promise().query("SELECT dept_name FROM department").then(([res]) => {
        console.table(res)
        prompt()
    })
};

const viewRoles = () => {
    db.promise().query("SELECT title, salary, dept_name AS department FROM role LEFT JOIN department ON department.id = role.department_id").then(([res]) => {
        console.table(res)
        prompt()
    })
};

const viewEmployee = () => {
    db.promise().query("SELECT CONCAT(first_name, ' ' , last_name) AS employee, role.title, role.salary, department.dept_name FROM employee LEFT JOIN role ON role.id = employee.role_id LEFT JOIN department ON role.department_id = department.id").then(([res]) => {
        console.table(res)
        prompt()
    })
};


///     ADDITION
const addRole = async() => {
    const [Departments] = await db.promise().query("SELECT * FROM department")
    const departmentArray = Departments.map(department => (
        {
            name: department.dept_name,
            value: department.id
        }
    ))

    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter title"
        },
        {
            type: "number",
            name: "salary",
            message: "enter salary"
        },
        {
            type: "list",
            name: "department_id",
            choices: departmentArray,
            message: "select department"
        }
    ]).then(({
        title, salary, department_id
    }) => {
        db.promise().query("INSERT INTO role SET ?", {title, salary, department_id} ).then(([res]) => {
            if(res.affectedRows >= 1) {
                viewRoles()
            } else {
                console.error("Failed to add role")
                prompt()
            }
        })
    })
}

const addEmployee = async() => {
    const [Roles] = await db.promise().query("SELECT * FROM role")
    const roleArrray = Roles.map(role => (
        {
            name: role.title,
            value: role.id
        }
    ))

    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "enter the employee's first name"
        },
        {
            type: "input",
            name: "last_name",
            message: "enter the employee's last name"
        },
        {
            type: "list",
            name: "role_id",
            choices: roleArrray,
            message: "select a role for the employee"
        }
    ]).then(({
        first_name, last_name, role_id
    }) => {
        db.promise().query("INSERT INTO employee SET ?", {first_name, last_name, role_id} ).then(([res]) => {
            if(res.affectedRows >= 1) {
                viewEmployee()
            } else {
                console.log("failed to add employee")
                prompt()
            }
        })
    })
}

// const addDepartment = async() => {
//     const []

//     inquirer.prompt([
//         {
//             type: "input",
//             name: "department_name",
//             message: "enter a new for the new department"
//         },
//         {
//             type: 
//         }
//     ])
// }

//Dept user input prompts
deptPrompt = data => {
    switch (data.command) {
        case "View all departments":
            getDepartment();
            break;

        case "Add a department":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "name",
                    message: "What department would you like to add?",
                    validate: response => {
                        if (response) {
                            return true;
                        } else {
                            console.log("Provide the name of the department that you wish to add");
                            return false;
                        }
                    }
                }
            ])
                .then((response) => {
                    addDepartment(response.name);
                })

        case "Delete a department":
            return inquirer.prompt([
                {
                    type: "input",
                    name: "id",
                    message: "Provide the id of the department that you want to delete",
                    validate: response => {
                        if (response) {
                            return true;
                        } else {
                            console.log("Please provide the id of the department you would like to delete");
                            return false;
                        }
                    }
                }
            ])
                .then((response) => {
                    deleteDepartment(response.id)
                })
    }
};

//Role use input prompts

//EE user input prompts

prompt();
// viewDepartments();
