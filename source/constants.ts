export const DB_CONNECTION_STRING: string = "server=.;Database=ashan_store;Trusted_Connection=Yes;Driver={ODBC Driver 17 for SQL Server}";
export const NON_EXISTENT_ID: number = -1;

export class Queries {

    public static ProductById: string = "SELECT * FROM product WHERE id = ?";
    public static AllProductsByStoreId = `SELECT p.id, p.inner_uuid, p.category_id, 
                                            p.create_date, p.update_date, p.create_user_id, p.update_user_id, 
                                            p.status_id  FROM product as p
                                            INNER JOIN store_to_product as stp
                                            ON p.id = stp.product_id and stp.store_id=?;`
    public static updateProductById = "UPDATE [ashan_store].[dbo].[product] SET inner_uuid = ?, name = ?, category_id = ?, update_date = ? WHERE id = ?";
    public static StoreById: string = "SELECT * FROM store WHERE id = ?";

    public static SelectIdentity: string = "SELECT SCOPE_IDENTITY() AS id;";

    public static EmployeeById: string = "SELECT * FROM employee WHERE id = ?"; 
    
    public static CategoryById: string = "SELECT * FROM category WHERE id = ?";

    public static UserById: string = "SELECT * FROM [user] WHERE id = ?";
    
}