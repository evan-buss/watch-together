using System;
using Xunit;
using MetaData.Models;

public class MetadataTest
{
    [Fact]
    public void GetByID()
    {
        //Given
        string expected = "its true";

        string actual = "its true";

        Assert.Equal(expected, actual);
        //When

        //Then
    }
}