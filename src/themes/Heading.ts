import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const basic = defineStyle({
    color: "50",
    fontFamily: "Lucida Sans Typewriter",
})

export const headingTheme = defineStyleConfig({
    variants: {
        "basic": basic
    },
})