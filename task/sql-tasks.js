'use strict';

/********************************************************************************************
 *                                                                                          *
 * The goal of the task is to get basic knowledge of SQL functions and                      *
 * approaches to work with data in SQL.                                                     *
 * https://dev.mysql.com/doc/refman/5.7/en/function-reference.html                          *
 *                                                                                          *
 * The course do not includes basic syntax explanations. If you see the SQL first time,     *
 * you can find explanation and some trainings at W3S                                       *
 * https://www.w3schools.com/sql/sql_syntax.asp                                             *
 *                                                                                          *
 ********************************************************************************************/


/**
 *  Create a SQL query to return next data ordered by city and then by name:
 * | Employy Id | Employee Full Name | Title | City |
 *
 * @return {array}
 *
 */
async function task_1_1(db) {
    // The first task is example, please follow the style in the next functions.
    let result = await db.query(`
        SELECT
           EmployeeID as "Employee Id",
           CONCAT(FirstName, ' ', LastName) AS "Employee Full Name",
           Title as "Title",
           City as "City"
        FROM Employees
        ORDER BY City, "Employee Full Name"
    `);
    return result[0];
}

/**
 *  Create a query to return an Order list ordered by order id descending:
 * | Order Id | Order Total Price | Total Order Discount, % |
 *
 * NOTES: Discount in OrderDetails is a discount($) per Unit.
 * @return {array}
 *
 */
async function task_1_2(db) {
    let result = await db.query(`
        SELECT
            OrderID as 'Order Id',
            sum(Quantity * UnitPrice) AS 'Order Total Price',
            ROUND(sum(Quantity * Discount) * 100 / sum (UnitPrice * Quantity), 3) AS 'Total Order Discount, %'
        FROM OrderDetails
        GROUP BY OrderID
        ORDER BY OrderId DESC;
`);
    return result[0];
}

/**
 *  Create a query to return all customers from USA without Fax:
 * | CustomerId | CompanyName |
 *
 * @return {array}
 *
 */
async function task_1_3(db) {
    let result = await db.query(`
    SELECT
        CustomerId,
        CompanyName
    FROM Customers
    WHERE Country = 'USA' AND Fax IS NULL
    `);
    return result[0];
}

/**
 * Create a query to return:
 * | Customer Id | Total number of Orders | % of all orders |
 *
 * order data by % - higher percent at the top, then by CustomerID asc
 *
 * @return {array}
 *
 */
async function task_1_4(db) {
    let result = await db.query(`
    SELECT 
        Customers.CustomerID AS 'Customer Id',
        count(OrderID) AS 'Total number of Orders',
        ROUND( count(OrderID) * 100 / (SELECT count(OrderID) FROM Orders), 5) AS '% of all orders'
    FROM Customers JOIN Orders ON Customers.CustomerId = Orders.CustomerId
    GROUP BY Customers.CustomerID
    ORDER BY count(OrderID) * 100 / (SELECT count(OrderID) from Orders) DESC, Customers.CustomerId;
    `);
    return result[0];
}

/**
 * Return all products where product name starts with 'A', 'B', .... 'F' ordered by name.
 * | ProductId | ProductName | QuantityPerUnit |
 *
 * @return {array}
 *
 */
async function task_1_5(db) {
    let result = await db.query(`
    SELECT 
        ProductId,
        ProductName,
        QuantityPerUnit
    FROM Products
    WHERE ProductName LIKE 'A%' OR ProductName LIKE 'B%' OR ProductName LIKE 'C%' OR ProductName LIKE 'D%' OR ProductName LIKE 'E%' OR ProductName LIKE 'F%'
    ORDER BY ProductName;
    `);
    return result[0]
}

/**
 *
 * Create a query to return all products with category and supplier company names:
 * | ProductName | CategoryName | SupplierCompanyName |
 *
 * Order by ProductName then by SupplierCompanyName
 * @return {array}
 *
 */
async function task_1_6(db) {
    let result = await db.query(`
    SELECT
        ProductName,
        CategoryName,
        CompanyName AS SupplierCompanyName
    FROM Products 
    JOIN Suppliers ON  Products.SupplierID = Suppliers.SupplierID 
    JOIN Categories ON Products.CategoryID = Categories.CategoryID
    ORDER BY ProductName, Suppliers.CompanyName;
    `);
    return result[0];
}

/**
 *
 * Create a query to return all employees and full name of person to whom this employee reports to:
 * | EmployeeId | FullName | ReportsTo |
 *
 * Order data by EmployeeId.
 * Reports To - Full name. If the employee does not report to anybody leave "-" in the column.
 * @return {array}
 *
 */
async function task_1_7(db) {
    let result = await db.query(`
    SELECT
        sub.EmployeeId,
        concat(sub.FirstName, ' ', sub.LastName) AS 'FullName',
        ifnull(concat(shief.FirstName, ' ', shief.LastName), '-') AS 'ReportsTo'
    FROM Employees AS sub
    LEFT JOIN Employees AS shief ON sub.ReportsTo = shief.EmployeeID
    ORDER BY sub.EmployeeID;
    `);
    return result[0]

}

/**
 *
 * Create a query to return:
 * | CategoryName | TotalNumberOfProducts |
 *
 * @return {array}
 *
 */
async function task_1_8(db) {
    let result = await db.query(`
    SELECT 
        CategoryName,
        count(ProductID) AS 'TotalNumberOfProducts'
    FROM Categories JOIN Products ON Categories.CategoryID = Products.CategoryID
    GROUP BY Categories.CategoryID
    `);
    return result[0]
}

/**
 *
 * Create a SQL query to find those customers whose contact name containing the 1st character is 'F' and the 4th character is 'n' and may be any character.
 * | CustomerID | ContactName |
 *
 * @return {array}
 *
 */
async function task_1_9(db) {
    let result = await db.query(`
    SELECT
        CustomerID,
        ContactName
    FROM Customers WHERE ContactName LIKE 'F%%n%';
    `);
    return result[0];
}

/**
 * Write a query to get discontinued Product list:
 * | ProductID | ProductName |
 *
 * @return {array}
 *
 */
async function task_1_10(db) {
    let result = await db.query(`
    SELECT
        ProductID,
        ProductName
    FROM Products WHERE Discontinued = 1;
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list (name, unit price) where products cost between $5 and $15:
 * | ProductName | UnitPrice |
 *
 * Order by UnitPrice then by ProductName
 *
 * @return {array}
 *
 */
async function task_1_11(db) {
    let result = await db.query(`
    SELECT
        ProductName,
        UnitPrice
    FROM Products WHERE UnitPrice >= 5 AND UnitPrice <= 15
    ORDER BY UnitPrice, ProductName
    `);
    return result[0];
}

/**
 * Write a SQL query to get Product list of twenty most expensive products:
 * | ProductName | UnitPrice |
 *
 * Order products by price then by ProductName.
 *
 * @return {array}
 *
 */
async function task_1_12(db) {
    let result = await db.query(`
    SELECT 
    ProductName,
    UnitPrice
    FROM (SELECT ProductName, UnitPrice 
            FROM Products 
            ORDER BY UnitPrice DESC
            LIMIT 20) AS Products
    ORDER BY UnitPrice, ProductName;
    `);
    return result[0];
}
/**
 * Create a SQL query to count current and discontinued products:
 * | TotalOfCurrentProducts | TotalOfDiscontinuedProducts |
 *
 * @return {array}
 *
 */
async function task_1_13(db) {
    let result = await db.query(`
    SELECT 
        count(ProductID) AS TotalOfCurrentProducts,
        sum(Discontinued) AS TotalOfDiscontinuedProducts
    FROM Products;
    `);
    return result[0];
}

/**
 * Create a SQL query to get Product list of stock is less than the quantity on order:
 * | ProductName | UnitsOnOrder| UnitsInStock |
 *
 * @return {array}
 *
 */
async function task_1_14(db) {
    let result = await db.query(`
    SELECT
        ProductName,
        UnitsOnOrder,
        UnitsInStock
    FROM Products
    WHERE UnitsOnOrder > UnitsInStock;
    `);
    return result[0];
}

/**
 * Create a SQL query to return the total number of orders for every month in 1997 year:
 * | January | February | March | April | May | June | July | August | September | November | December |
 *
 * @return {array}
 *
 */
async function task_1_15(db) {
    let result = await db.query(`
    SELECT
        sum(month(OrderDate)=1) AS 'January',
        sum(month(OrderDate)=2) AS 'February',
        sum(month(OrderDate)=3) AS 'March',
        sum(month(OrderDate)=4) AS 'April',
        sum(month(OrderDate)=5) AS 'May',
        sum(month(OrderDate)=6) AS 'June',
        sum(month(OrderDate)=7) AS 'July',
        sum(month(OrderDate)=8) AS 'August',
        sum(month(OrderDate)=9) AS 'September',
        sum(month(OrderDate)=10) AS 'October',
        sum(month(OrderDate)=11) AS 'November',
        sum(month(OrderDate)=12) AS 'December'
    FROM Orders WHERE year(OrderDate)=1997;
    `);
    return result[0];
}
/**
 * Create a SQL query to return all orders where ship postal code is provided:
 * | OrderID | CustomerID | ShipCountry |
 *
 * @return {array}
 *
 */
async function task_1_16(db) {
    let result = await db.query(`
    SELECT
        OrderID,
        CustomerID,
        ShipCountry
    FROM Orders WHERE ShipPostalCode IS NOT NULL;
    `);
    return result[0]
}

/**
 * Create SQL query to display the average price of each categories's products:
 * | CategoryName | AvgPrice |
 *
 * @return {array}
 *
 * Order by AvgPrice descending then by CategoryName
 *
 */
async function task_1_17(db) {
    let result = await db.query(`
    SELECT
        CategoryName,
        avg(UnitPrice) AS 'AvgPrice'
    FROM Categories JOIN Products ON Categories.CategoryID = Products.CategoryID
    GROUP BY CategoryName
    ORDER BY avg(UnitPrice) DESC, CategoryName;
    `);
    return result[0];
}

/**
 * Create a SQL query to calcualte total orders count by each day in 1998:
 * | OrderDate | Total Number of Orders |
 *
 * OrderDate needs to be in the format '%Y-%m-%d %T'
 * @return {array}
 *
 */
async function task_1_18(db) {
    let result = await db.query(`
    SELECT 
        date_format(OrderDate, '%Y-%m-%d %T') AS 'OrderDate',
        count(OrderID) AS 'Total Number of Orders'
    FROM Orders WHERE year(OrderDate)=1998
    GROUP BY OrderDate;
    `);
    return result[0];
}

/**
 * Create a SQL query to display customer details whose total orders amount is more than 10000$:
 * | CustomerID | CompanyName | TotalOrdersAmount, $ |
 *
 * Order by "TotalOrdersAmount, $" descending then by CustomerID
 * @return {array}
 *
 */
async function task_1_19(db) {
    let result = await db.query(`
    SELECT
        Customers.CustomerID,
        CompanyName,
        sum(UnitPrice * Quantity) AS 'TotalOrdersAmount, $'
    FROM Customers JOIN Orders ON Customers.CustomerID = Orders.CustomerID JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
    GROUP BY Customers.CustomerID
    HAVING sum(UnitPrice * Quantity) > 10000
    ORDER BY sum(UnitPrice * Quantity) DESC, CustomerID;
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find the employee that sold products for the largest amount:
 * | EmployeeID | Employee Full Name | Amount, $ |
 *
 * @return {array}
 *
 */
async function task_1_20(db) {
    let result = await db.query(`
    SELECT 
        Employees.EmployeeID,
        concat(FirstName, ' ', LastName) AS 'Employee Full Name',
        sum(UnitPrice * Quantity) AS 'Amount, $'
    FROM Employees 
    JOIN Orders ON Employees.EmployeeID = Orders.EmployeeID 
    JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
    GROUP BY Employees.EmployeeID
    ORDER BY sum(UnitPrice * Quantity) DESC
    LIMIT 1;
    `);
    return result[0];
}
/**
 * Write a SQL statement to get the maximum purchase amount of all the orders.
 * | OrderID | Maximum Purchase Amount, $ |
 *
 * @return {array}
 */
async function task_1_21(db) {
    let result = await db.query(`
    SELECT 
        OrderID,
        sum(UnitPrice * Quantity) AS 'Maximum Purchase Amount, $'
    FROM OrderDetails
    GROUP BY OrderID
    ORDER BY sum(UnitPrice * Quantity) DESC
    LIMIT 1;
    `);
    return result[0];
}

/**
 * Create a SQL query to display the name of each customer along with their most expensive purchased product:
 * | CompanyName | ProductName | PricePerItem |
 *
 * order by PricePerItem descending and them by CompanyName and ProductName acceding
 * @return {array}
 */
async function task_1_22(db) {
    let result = await db.query(`
    SELECT DISTINCT
	    Customers.CompanyName,
        Products.ProductName,
        OrderDetails.UnitPrice AS PricePerItem
    FROM Customers
    JOIN Orders ON Customers.CustomerID = Orders.CustomerID
    JOIN OrderDetails ON Orders.OrderID = OrderDetails.OrderID
    JOIN Products ON OrderDetails.ProductID = Products.ProductID
    WHERE OrderDetails.UnitPrice = (
                SELECT 
                    max(ordDet.UnitPrice)
				FROM Customers AS cust
                JOIN Orders as ord ON cust.CustomerID = ord.CustomerID
                JOIN OrderDetails ordDet ON ord.OrderID = ordDet.OrderID
                WHERE Customers.CustomerID = cust.CustomerID
    )
    ORDER BY OrderDetails.UnitPrice DESC, Customers.CompanyName, Products.ProductName
    `);
    return result[0]
}

module.exports = {
    task_1_1: task_1_1,
    task_1_2: task_1_2,
    task_1_3: task_1_3,
    task_1_4: task_1_4,
    task_1_5: task_1_5,
    task_1_6: task_1_6,
    task_1_7: task_1_7,
    task_1_8: task_1_8,
    task_1_9: task_1_9,
    task_1_10: task_1_10,
    task_1_11: task_1_11,
    task_1_12: task_1_12,
    task_1_13: task_1_13,
    task_1_14: task_1_14,
    task_1_15: task_1_15,
    task_1_16: task_1_16,
    task_1_17: task_1_17,
    task_1_18: task_1_18,
    task_1_19: task_1_19,
    task_1_20: task_1_20,
    task_1_21: task_1_21,
    task_1_22: task_1_22
};
