import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Flex,
  Text,
  Button,
  Spacer,
} from "@chakra-ui/react"
import { IconProp } from "@fortawesome/fontawesome-svg-core"
import { faArrowLeft, faChartSimple, faCoins, faListOl, faQuestion, faRectangleList, faUserGroup } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactNode } from "react"
import { Link , useRoute } from "wouter"

interface MenuProps {
  to: string,
  number: string,
  name: string,
}

interface AccordionMenuProps {
  number: string,
  icon: IconProp,
  name: string,
  children: ReactNode
}

function Menu(props: MenuProps) {
  const [match] = useRoute(props.to);
  return (
      <>
          <Link href={props.to}>
              <Button transitionDuration="0.5s" _hover={{ "bg": "primary-color2" }} bg={match ? "primary-color2" : "#0000"} color="#6B6B6B" px="2" h="38px" w="100%">
                  <Flex alignItems="center" fontWeight="400" flex='1' textAlign='left'>
                      <Flex fontSize="14px" transitionDuration="1s" justifyContent="center" alignItems="center" bg={match ? "primary-color8" : "#ededed"} color={match ? "#fff" : ""} px="3" py="1" w="40px" borderRadius="2px">
                          {props.number}
                      </Flex>
                      <Text ml="2" fontSize="14px">{props.name}</Text>
                  </Flex>
              </Button>
          </Link>
      </>
  )
}

function AccordionMenu(props: AccordionMenuProps) {
  return (
      <>
          <AccordionItem  border="none">
              <h2>
                  <AccordionButton borderRadius="5px" _hover={{ "bg": "primary-color2" }} p="2">
                      <Flex alignItems="center" fontWeight="400" flex='1' textAlign='left'>
                          <Flex fontSize="14px" justifyContent="center" alignItems="center" bg="#ededed" h="27px" w="27px" borderRadius="2px">
                              {props.number}
                          </Flex>
                          <Text ml="2" fontSize="14px" mr="2"><FontAwesomeIcon icon={props.icon} /></Text> <Text fontSize="14px">{props.name}</Text>
                      </Flex>
                      <AccordionIcon />
                  </AccordionButton>
              </h2>
              <AccordionPanel p="0">
                  {props.children}
              </AccordionPanel>
          </AccordionItem>
          <Box mt="5px" mb="5px" border="1px solid #ededed"></Box>
      </>
  )
}

function Header() {
  return (
      <>
          <Flex
              pos="fixed"
              top="80px"
              w="217px"
              transform="translateX(0)"
              height="calc(100% - 88px)"
              bg="#fff"
              boxShadow='xl'
              p="2"
              direction="column"
          >
              <Accordion allowToggle>
                  <AccordionMenu number="1" icon={faUserGroup} name="Account">
                      <Menu to="/app/account/profile" number="1.1" name="Profile" />
                  </AccordionMenu>
                  <AccordionMenu number="2" icon={faUserGroup} name="Management">
                      <Menu to="/app/manage/create-agent" number="2.1" name="Create Agent" />
                      <Menu to="/app/manage/create-member" number="2.2" name="Create Member" />
                      <Menu to="/app/manage/create-agent/member-list" number="2.2" name="Create Agent/Member List" />
                      <Menu to="/app/manage/present-pt" number="2.3" name="Present PT" />
                      <Menu to="/app/manage/sub-account" number="2.4" name="Sub Account" />
                      <Menu to="/app/manage/clone-member" number="2.5" name="Clone member" />
                  </AccordionMenu>
                  <AccordionMenu number="3" icon={faRectangleList} name="Stock Sports">
                      <Menu to="" number="3.1" name="HDP & OU" />
                      <Menu to="" number="3.2" name="OE & 1X2" />
                      <Menu to="" number="3.3" name="All Bet" />
                      <Menu to="" number="3.4" name="Waiting" />
                      <Menu to="" number="3.5" name="Mix Parlay" />
                      <Menu to="" number="3.6" name="Mix Combo" />
                      <Menu to="" number="3.7" name="Member Outstanding" />
                  </AccordionMenu>
                  <AccordionMenu number="4" icon={faRectangleList} name="Stock Lotto">
                      <Menu to="" number="4.1" name="Limit Settings" />
                      <Menu to="" number="4.2" name="Bet List" />
                  </AccordionMenu>
                  <AccordionMenu number="5" icon={faChartSimple} name="Report">
                      <Menu to="" number="5.1" name="W/L Account (Simple)" />
                      <Menu to="" number="5.2" name="Win/Lose Provider" />
                      <Menu to="" number="5.3" name="Bet Result" />
                      <Menu to="" number="5.4" name="Cancel/Reject" />
                      <Menu to="" number="5.5" name="Abnormal Ticket" />
                  </AccordionMenu>
                  <AccordionMenu number="6" icon={faCoins} name="Paymeny">
                      <Menu to="" number="6.1" name="Member Report" />
                      <Menu to="" number="6.2" name="Deposit/Withdraw" />
                      <Menu to="" number="6.3" name="Payment History" />
                  </AccordionMenu>
                  <AccordionMenu number="7" icon={faCoins} name="Cash Payment">
                      <Menu to="" number="7.1" name="Deposit List" />
                      <Menu to="" number="7.2" name="Withdraw" />
                      <Menu to="" number="7.3" name="Set Bank" />
                      <Menu to="" number="7.4" name="Set ExAuto" />
                  </AccordionMenu>
                  <AccordionMenu number="8" icon={faListOl} name="Result">
                      <Menu to="" number="8.1" name="Sport Result" />
                      <Menu to="" number="8.2" name="Thai Lotto Result" />
                  </AccordionMenu>
                  <AccordionMenu number="9" icon={faQuestion} name="Affiliate">
                      <Menu to="" number="9.1" name="Affiliate" />
                  </AccordionMenu>
              </Accordion>
              <Spacer />

              <Button _hover={{ bg: "primary-color2" }} fontWeight="light" h="36px" p="3" color="primary-color1" borderColor="primary-color1" border="1.5px solid" variant='outline'>
                  <Text ml="2" fontSize="14px" mr="2"><FontAwesomeIcon icon={faArrowLeft} /></Text>
              </Button>
          </Flex>
      </>
  )
}

export default Header