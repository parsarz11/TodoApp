using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data.Context;
using TodoApp.Data.Repositories;
using TodoApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<TaskService>();
builder.Services.AddScoped<TaskRepo>();
builder.Services.AddScoped<EmailSender>();
builder.Services.AddScoped<DashBoardServices>();


builder.Services.AddDbContext<TodoDatabaseContext>(config=>
{
    config.UseSqlServer(builder.Configuration.GetConnectionString("Default"));
});
//builder.Services.AddDefaultIdentity<IdentityUser>().AddRoles<IdentityRole>().AddEntityFrameworkStores<MyAppDatabaseContext>().AddDefaultTokenProviders();


builder.Services.AddControllersWithViews();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Task}/{action=DashBoard}/{id?}");

app.Run();
