using System;
using System.IO;
namespace watch_together.Util
{
    public static class WordPairGenerator
    {
        private static string[] adjectives = File.ReadAllLines("Util/adj.txt");
        private static string[] nouns = File.ReadAllLines("Util/noun.txt");

        /// <summary>
        ///  Generate a new adjective-noun word pair.
        /// </summary>
        /// <returns>String in "adj-noun" form</returns>
        public static string Generate()
        {
            Random rand = new Random();
            return String.Format("{0}-{1}", adjectives[rand.Next(0, adjectives.Length)], nouns[rand.Next(0, nouns.Length)]);
        }
    }
}