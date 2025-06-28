// Import component types from within library
import type {
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
} from './index';

// Augment the official Vue types
declare module 'vue' {
    export interface GlobalComponents {
        Badge: typeof Badge;
        Button: typeof Button;
        ButtonToggle: typeof ButtonToggle;
        Card: typeof Card;
        Checkbox: typeof Checkbox;
        Date: typeof Date;
        Dialog: typeof Dialog;
        EllipsisText: typeof EllipsisText;
        ExpansionItem: typeof ExpansionItem;
        Fab: typeof Fab;
        FabAction: typeof FabAction;
        Header: typeof Header;
        Icon: typeof Icon;
        Input: typeof Input;
        MathOperationButtons: typeof MathOperationButtons;
        NavMenu: typeof NavMenu;
        PullToRefresh: typeof PullToRefresh;
        ScrollArea: typeof ScrollArea;
        Select: typeof Select;
        SlideItem: typeof SlideItem;
        Spinner: typeof Spinner;
        Stepper: typeof Stepper;
        StepperStep: typeof StepperStep;
        Tab: typeof Tab;
        Tabs: typeof Tabs;
        Tooltip: typeof Tooltip;
        TouchNumberInput: typeof TouchNumberInput;
        TransitionGroupFadeSlide: typeof TransitionGroupFadeSlide;
    }
}

// This export statement is required to make the file a module
export {};
