// import { createContext, useReducer } from "react";


// export const ThemeContext = createContext()

// const themeReducer = (state, action) => {

//     switch (action.type) {
//         case 'CHANGE_COLOR_MAIN':
//             return { ...state, colorMain: action.payload }
//         case 'CHANGE_COLOR_SIDEBAR':
//             console.log(state)
//             return { ...state, colorSidebar: action.payload }

//         default:
//             return state
//     }
// }

// export function ColorThemeProvider({ children }) {
//     const [state, dispatch] = useReducer(themeReducer, {
//         colorSidebar: '#8d69f1',
//         colorMain: '#f4f4f4'

//     })
//     const changeSidebarColor = (color) => {
//         dispatch({ type: 'CHANGE_COLOR_SIDEBAR', payload: color })
//     }

//     const changeMainColor = (color) => {
//         dispatch({ type: 'CHANGE_COLOR_MAIN', payload: color })
//     }



//     return (
//         <ThemeContext.Provider value={{ ...state, changeSidebarColor, changeMainColor }}>
//             {children}
//         </ ThemeContext.Provider>
//     )
// }