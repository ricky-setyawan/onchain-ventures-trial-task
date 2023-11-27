import { useUser, UserButton, SignInButton } from '@clerk/nextjs'
import React from 'react'
import styled from 'styled-components'

import MoonIcon from 'assets/svg/app/moon.svg'
import SunIcon from 'assets/svg/app/sun.svg'
import Button from 'components/Button'
import { useAutoConnect } from 'hooks/useAutoConnect'
import { useAppDispatch, useAppSelector } from 'state/hooks'
import { setTheme } from 'state/preferences/reducer'
import { selectCurrentTheme } from 'state/preferences/selectors'

const WalletButtons: React.FC = () => {
	const dispatch = useAppDispatch()

	const currentTheme = useAppSelector(selectCurrentTheme)

	const { isSignedIn } = useUser()

	const ThemeIcon = currentTheme === 'dark' ? SunIcon : MoonIcon

	const toggleTheme = () => {
		dispatch(setTheme(currentTheme === 'light' ? 'dark' : 'light'))
	}

	useAutoConnect()

	return (
		<Container>
			<MenuButton onClick={toggleTheme} noOutline>
				<ThemeIcon width={20} />
			</MenuButton>
			{isSignedIn ? (
				<UserButton appearance={{ elements: SunIcon }} showName={true} />
			) : (
				<SignInButton>
					<Button size="small" variant="flat" mono>
						Sign In
					</Button>
				</SignInButton>
			)}
		</Container>
	)
}

const Container = styled.div`
	display: grid;
	grid-gap: 15px;
	grid-auto-flow: column;
`

const MenuButton = styled(Button)`
	display: grid;
	place-items: center;
	height: 41px;
	width: 41px;
	padding: 0px;

	svg {
		path {
			fill: ${(props) => props.theme.colors.selectedTheme.icon.fill};
		}
	}

	:hover {
		svg {
			path {
				fill: ${(props) => props.theme.colors.selectedTheme.icon.hover};
			}
		}
	}
`

export default WalletButtons
