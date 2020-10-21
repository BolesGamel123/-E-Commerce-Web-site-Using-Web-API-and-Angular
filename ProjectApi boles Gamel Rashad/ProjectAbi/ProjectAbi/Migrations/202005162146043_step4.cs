namespace ProjectAbi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class step4 : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Products", "customerId", "dbo.AspNetUsers");
            DropIndex("dbo.Products", new[] { "customerId" });
            DropColumn("dbo.Products", "customerId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Products", "customerId", c => c.String(maxLength: 128));
            CreateIndex("dbo.Products", "customerId");
            AddForeignKey("dbo.Products", "customerId", "dbo.AspNetUsers", "Id");
        }
    }
}
