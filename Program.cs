using System.IO;
using System;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

namespace watch_together
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateConfigIfNotExists();
            //CreateWebHostBuilder(args).UseUrls(new string[] { "http://0.0.0.0:5000" }).Build().Run();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddIniFile("config.ini", optional: true, reloadOnChange: true);
                }).UseStartup<Startup>();

        public static void CreateConfigIfNotExists()
        {
            //FIXME: Figure out if the SpecialFolder points to the right place on linux 
            var videoDir = System.Environment.GetFolderPath(Environment.SpecialFolder.MyVideos,
                Environment.SpecialFolderOption.Create);
            var configDir = System.Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData,
                Environment.SpecialFolderOption.Create);
            var configFile = Path.Combine(configDir, "watch-together", "config.ini");
            Directory.CreateDirectory(Path.GetDirectoryName(configFile));
            if (File.Exists(configFile)) return;
            Console.WriteLine("Writing initial config file...");

            File.WriteAllText(configFile, "[library]\n" +
                                          "directory=\""
                                          + videoDir 
                                          + "\"\n\n"
                                          + "[server]\n" 
                                          + "port = 8080");
        }
    }
}