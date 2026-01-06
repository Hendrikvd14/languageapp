using System;
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class CardExtensions
{
    public static CardDto ToDto(this Card card)
    {
        return new CardDto
        {
            Back = card.Back,
            Front = card.Front,
            ExampleSentence = card.ExampleSentence
        };
    }
}
