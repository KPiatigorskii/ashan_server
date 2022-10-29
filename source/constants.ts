//export const DB_CONNECTION_STRING: string = "server=.;Database=ashan_store;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
export const DB_CONNECTION_STRING: string = "server=DESKTOP-AE49AV3\\SQLEXPRESS;Database=ashan_store;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
export const NON_EXISTENT_ID: number = -1;
export const TOKEN_SECRET: string = "08d24819-dfa6-424c-9fda-ae6530033d49";

export class Queries {


    public static GetUserByLogin: string = "SELECT id , password, role_id FROM [ashan_store].[dbo].[user]  WHERE login = ?"
    public static AddUser: string = "INSERT [user] (first_name, last_name, login, password, role_id, create_date, update_date, create_user_id, update_user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    public static DeleteUserById: string = "UPDATE [user] SET update_date = ?, update_user_id = ?, status_id = ? WHERE id = ? AND status_id = ?";
    public static UpdateUserById: string = "UPDATE [user] SET first_name = ?, last_name = ?, update_date = ?, update_user_id = ? WHERE id = ? AND status_id = ?";
    

    public static ProductById: string = "SELECT * FROM product WHERE id = ?";
    public static AllProducts: string = "SELECT * FROM product";
    public static AllProductsByStoreId: string  = `SELECT p.id, p.inner_uuid, p.category_id, 
                                            p.create_date, p.update_date, p.create_user_id, p.update_user_id, 
                                            p.status_id  FROM product as p
                                            INNER JOIN store_to_product as stp
                                            ON p.id = stp.product_id and stp.store_id=?;`
    public static UpdateProductById: string  = "UPDATE [ashan_store].[dbo].[product] SET inner_uuid = ?, name = ?, category_id = ?, update_date = ? WHERE id = ?";
    public static CreateProduct: string = `INSERT [ashan_store].[dbo].[product]
                                        (inner_uuid, name, category_id, create_date, update_date, create_user_id, update_user_id, status_id)
                                          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    public static CreateLocation: string = `INSERT [ashan_store].[dbo].[store_to_product] 
                                        (product_id, store_id, amount_of_product, row_in_store, shelf_in_store)
                                        VALUES (?, ?, ?, ?, ?)`
    
    public static StoreById: string = "SELECT * FROM store WHERE id = ?";
    public static GetAllStores:string = "SELECT * FROM store";
    public static CreateStore:string = `INSERT [ashan_store].[dbo].[store]  
    (address, store_name, create_date, update_date, create_user_id, update_user_id, status_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)`
    public static UpdateStoreById:string = "UPDATE [ashan_store].[dbo].[store] SET address = ?, store_name = ?, update_date = ? WHERE id = ?";
    

    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";

    public static EmployeeById: string = "SELECT * FROM [ashan_store].[dbo].[employee] WHERE id = ?"; 
    public static GetAllEmployee: string = "SELECT * FROM [ashan_store].[dbo].[employee]";
    public static CreateEmployee: string = `INSERT [ashan_store].[dbo].[employee] 
    (first_name, last_name,store_id, date_of_birth, position, chief_id, status_id, create_date, update_date, create_user_id, update_user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    public static UpdateEmployeeById: string = `UPDATE [ashan_store].[dbo].[employee] SET
     first_name = ?, last_name = ?, store_id = ?, date_of_birth = ?, position = ?, chief_id = ?,
    status_id = ?, update_date = ?, update_user_id = ? where id = ?`;
    public static DeleteEmployeeById: string = "UPDATE [ashan_store].[dbo].[employee] SET status_id = 0 WHERE id = ?";

    public static CreateRelationEmployee: string = "UPDATE [ashan_store].[dbo].[employee] SET chief_id = ? WHERE id = ?";
    public static DeleteRelationEmployee: string = "UPDATE [ashan_store].[dbo].[employee] SET chief_id = -1 WHERE id = ?";
    
    public static CategoryById: string = "SELECT * FROM category WHERE id = ?";

    public static UserById: string = "SELECT * FROM [user] WHERE id = ?";
    
}