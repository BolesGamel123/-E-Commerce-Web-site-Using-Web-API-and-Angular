namespace ProjectAbi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class step2 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.AspNetUsers", "Product_ID", "dbo.Products");
            DropIndex("dbo.AspNetUsers", new[] { "Product_ID" });
            AddColumn("dbo.Products", "customerId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Products", "customerId");
            AddForeignKey("dbo.Products", "customerId", "dbo.AspNetUsers", "Id");
            DropColumn("dbo.AspNetUsers", "Product_ID");
        }
        
        public override void Down()
        {
            AddColumn("dbo.AspNetUsers", "Product_ID", c => c.Int());
            DropForeignKey("dbo.Products", "customerId", "dbo.AspNetUsers");
            DropIndex("dbo.Products", new[] { "customerId" });
            DropColumn("dbo.Products", "customerId");
            CreateIndex("dbo.AspNetUsers", "Product_ID");
            AddForeignKey("dbo.AspNetUsers", "Product_ID", "dbo.Products", "ID");
        }
    }
}
