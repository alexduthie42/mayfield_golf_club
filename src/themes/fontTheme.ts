import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const boldBlue = defineStyle({
    color: "50",
    fontFamily: "Encode Sans Condensed",
    fontWeight: "bold"
})

const semiBoldWhite = defineStyle({
    color: "0",
    fontFamily: "Encode Sans Condensed",
    fontWeight: "semibold"
})

export const fontTheme = defineStyleConfig({
    variants: {
        "boldBlue": boldBlue,
        "semiboldWhite": semiBoldWhite
    },
})