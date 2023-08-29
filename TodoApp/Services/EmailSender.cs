using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System.Security.Cryptography;

namespace TodoApp.Services
{
    public class EmailSender
    {

        public void SendEmail(string url, string Email)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse("emailidentification8@gmail.com"));
            email.To.Add(MailboxAddress.Parse("p.razaghan1387@gmail.com"));
            email.Subject = "test eamil for reminder";
            email.Body = new TextPart(TextFormat.Html) { Text = $"<a href='{url}'>this is test</a>" };




            using var smtp = new SmtpClient();
            smtp.Connect("smtp.gmail.com", 465, true);
            smtp.Authenticate("emailidentification8@gmail.com", "wokwmfclpcfbbhkc");
            smtp.Send(email);
            smtp.Disconnect(true);
        }
        
    }
}
