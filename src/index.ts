import type { App } from 'vue';

// Css stuff
import './assets/icons.css';

// Components
import Badge from './components/Badge.vue';
import Button from './components/Button.vue';
import ButtonToggle from './components/ButtonToggle.vue';
import Card from './components/Card.vue';
import Checkbox from './components/Checkbox.vue';
import Date from './components/Date.vue';
import Dialog from './components/Dialog.vue';
import EllipsisText from './components/EllipsisText.vue';
import ExpansionItem from './components/ExpansionItem.vue';
import Fab from './components/Fab.vue';
import FabAction from './components/FabAction.vue';
import Header from './components/Header.vue';
import Icon from './components/Icon.vue';
import Input from './components/Input.vue';
import MathOperationButtons from './components/MathOperationButtons.vue';
import NavMenu from './components/NavMenu.vue';
import PullToRefresh from './components/PullToRefresh.vue';
import ScrollArea from './components/ScrollArea.vue';
import Select from './components/Select.vue';
import SlideItem from './components/SlideItem.vue';
import Spinner from './components/Spinner.vue';
import Stepper from './components/Stepper.vue';
import StepperStep from './components/StepperStep.vue';
import Tab from './components/Tab.vue';
import Tabs from './components/Tabs.vue';
import Tooltip from './components/Tooltip.vue';
import TouchNumberInput from './components/TouchNumberInput.vue';
import TransitionGroupFadeSlide from './components/TransitionGroupFadeSlide.vue';

// Directives
import { rippleDirective } from './directives/ripple';

const install = (app: App) => {
    app.directive('ripple', rippleDirective);

    // Register components globally
    app.component('Badge', Badge);
    app.component('Button', Button);
    app.component('ButtonToggle', ButtonToggle);
    app.component('Card', Card);
    app.component('Checkbox', Checkbox);
    app.component('Date', Date);
    app.component('Dialog', Dialog);
    app.component('EllipsisText', EllipsisText);
    app.component('ExpansionItem', ExpansionItem);
    app.component('Fab', Fab);
    app.component('FabAction', FabAction);
    app.component('Header', Header);
    app.component('Icon', Icon);
    app.component('Input', Input);
    app.component('MathOperationButtons', MathOperationButtons);
    app.component('NavMenu', NavMenu);
    app.component('PullToRefresh', PullToRefresh);
    app.component('ScrollArea', ScrollArea);
    app.component('Select', Select);
    app.component('SlideItem', SlideItem);
    app.component('Spinner', Spinner);
    app.component('Stepper', Stepper);
    app.component('StepperStep', StepperStep);
    app.component('Tab', Tab);
    app.component('Tabs', Tabs);
    app.component('Tooltip', Tooltip);
    app.component('TouchNumberInput', TouchNumberInput);
    app.component('TransitionGroupFadeSlide', TransitionGroupFadeSlide);
};

const Windvane = {
    install,
};

export default Windvane;

export {
    Badge,
    Button,
    ButtonToggle,
    Card,
    Checkbox,
    Date,
    Dialog,
    EllipsisText,
    ExpansionItem,
    Fab,
    FabAction,
    Header,
    Icon,
    Input,
    MathOperationButtons,
    NavMenu,
    PullToRefresh,
    ScrollArea,
    Select,
    SlideItem,
    Spinner,
    Stepper,
    StepperStep,
    Tab,
    Tabs,
    Tooltip,
    TouchNumberInput,
    TransitionGroupFadeSlide,
};
