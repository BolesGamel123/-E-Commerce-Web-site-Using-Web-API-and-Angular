namespace ProjectAbi.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class step22 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Products", "Quantity", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Products", "Quantity");
        }
    }
}
