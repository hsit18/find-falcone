import '@testing-library/jest-dom';
import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react';
import { HashRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <HashRouter>
                {children}
            </HashRouter>
        </Provider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }