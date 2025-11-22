import React from 'react';
import './../App.css';
import { 
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  ButtonGroup
} from '@chakra-ui/react'
import { 
  HamburgerIcon 
} from '@chakra-ui/icons'

interface NavDrawerProps {
    page: string;
    setPage: (page: string) => void;
  }

export default function NavDrawer(navDrawerProps: NavDrawerProps) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);
    const buttonVariant = 'outline';

    return (
        <div>
            <Button ref={btnRef} variant="ghost" onClick={onOpen}>
                <HamburgerIcon w={6} h={6} color="white" />
            </Button>
            <Drawer
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={btnRef}
                placement='left'
                size='md'
            >
            <DrawerOverlay />
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>

                <Button variant={buttonVariant} mr={3} className='menubutton' onClick={() => OnMenuButtonClick("home", navDrawerProps.setPage, onClose)}>Home</Button>
                <Button variant={buttonVariant} mr={3} className='menubutton' onClick={() => OnMenuButtonClick("course", navDrawerProps.setPage, onClose)}>Course</Button>
                <Button variant={buttonVariant} mr={3} className='menubutton' onClick={() => OnMenuButtonClick("schedule", navDrawerProps.setPage, onClose)}>Schedule</Button>
                {/* <Button variant={buttonVariant} mr={3} className='menubutton' onClick={() => OnMenuButtonClick("contact", navDrawerProps.setPage, onClose)}>Contact</Button> */}
            </DrawerContent>
            </Drawer>
        </div>
    );
}

function OnMenuButtonClick(page: string, setPage: (page: string) => void, onClose: () => void) {
    setPage(page);
    onClose();
}

