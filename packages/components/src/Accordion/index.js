import { Accordion } from './Accordion';
import Header from './Header';
import Item from './Item';
import Panel from './Panel';
import StatefulAccordion from './StatefulAccordion';

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Panel = Panel;

export { Accordion, StatefulAccordion };
export { default as BasicHeader } from './types/BasicHeader';
