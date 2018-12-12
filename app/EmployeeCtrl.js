//Create initial module
var app = angular.module("EmployeeMgmt", []);

//Create controller
app.controller("EmployeeCtrl", function ($scope, $http) {

    $scope.title = "Employee Listing"
    $scope.newEmployee = {}

    //Display current employees on the website...
    $http
    .get("https://employees-cb616.firebaseio.com/employees/.json")
    .then(function(response){
        $scope.employees = response.data
    })

    //Define what is stored in a new employee object
    $scope.addNewEmployee = function(){
        $http.post("https://employees-cb616.firebaseio.com/employees/.json", {
            "firstName":$scope.newEmployee.firstName,
            "lastName": $scope.newEmployee.lastName,
            "employmentStart": Date.now(),
            "employmentEnd": 0

        }).then(function(){
            displayEmployees()
            $scope.newEmployee.firstName = ""
            $scope.newEmployee.lastName = ""
        })
    }

    //Created a function to store the display of employees
    const displayEmployees = function (){
        $http
        .get("https://employees-cb616.firebaseio.com/employees/.json")
        .then(function(response){
            $scope.employees = response.data
        })
    }

    $scope.fireEmployee = function(employee, key){

        //On click employementEnd date becomes the current date
        employee.employmentEnd = Date.now()

        //Then will update the employmentEnd date in firebase
        //Argument targets the current employee and the assigned ${key} in firebase
        $http
        .put(`https://employees-cb616.firebaseio.com/employees/${key}/.json`, employee
        )
        .then(function(){
            displayEmployees()
        })
    }

    });