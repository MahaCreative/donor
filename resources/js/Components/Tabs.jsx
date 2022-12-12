import { Fragment, useState } from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';

function Tabs({ children }) {
    return (
        <div className='w-full sm:px-0 rounded-lg overflow-hidden'>
            <Tab.Group>{children}</Tab.Group>
        </div>
    );
}
function TabPanels({ children }) {
    return <Tab.Panels>{children}</Tab.Panels>;
}
function TabPanel({ children }) {
    return <Tab.Panel className={'bg-white py-2.5 px-4'}>{children}</Tab.Panel>;
}
function TabList({ children }) {
    return <Tab.List>{children}</Tab.List>;
}
function TabItem({ children, classNameItem }) {
    return (
        <>
            <Tab as={Fragment}>
                {({ selected }) => (
                    /* Use the `selected` state to conditionally style the selected tab. */
                    <button
                        className={clsx(
                            classNameItem ? classNameItem : '',
                            selected
                                ? 'bg-gray-700 text-white outline-none shadow-inner shadow-gray-800'
                                : 'bg-gray-300 text-black',
                            'py-1.5 px-4'
                        )}
                    >
                        {children}
                    </button>
                )}
            </Tab>
        </>
    );
}
Tabs.TabList = TabList;
Tabs.TabPanels = TabPanels;
Tabs.TabPanel = TabPanel;
Tabs.TabItem = TabItem;
export default Tabs;
