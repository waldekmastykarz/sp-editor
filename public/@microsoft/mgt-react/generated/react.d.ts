/// <reference types="react" />
import { OfficeGraphInsightString, ViewType, ResponseType, IDynamicPerson, PersonType, GroupType, UserType, PersonCardInteraction, MgtPersonConfig, AvatarSize, PersonViewType, TasksStringResource, TasksSource, TaskFilter, SelectedChannel, TodoFilter } from '@microsoft/mgt-components';
import { TemplateContext, ComponentMediaQuery } from '@microsoft/mgt-element';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';
export declare type AgendaProps = {
    date?: string;
    groupId?: string;
    days?: number;
    eventQuery?: string;
    events?: MicrosoftGraph.Event[];
    showMax?: number;
    groupByDay?: boolean;
    preferredTimezone?: string;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    eventClick?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type FileListProps = {
    fileListQuery?: string;
    fileQueries?: string[];
    files?: MicrosoftGraph.DriveItem[];
    siteId?: string;
    driveId?: string;
    groupId?: string;
    itemId?: string;
    itemPath?: string;
    userId?: string;
    insightType?: OfficeGraphInsightString;
    fileExtensions?: string[];
    hideMoreFilesButton?: boolean;
    maxFileSize?: number;
    excludedFileExtensions?: string[];
    pageSize?: number;
    itemView?: ViewType;
    maxUploadFile?: number;
    enableFileUpload?: boolean;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    itemClick?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type FileProps = {
    fileQuery?: string;
    siteId?: string;
    driveId?: string;
    groupId?: string;
    listId?: string;
    userId?: string;
    itemId?: string;
    itemPath?: string;
    insightType?: OfficeGraphInsightString;
    insightId?: string;
    fileDetails?: MicrosoftGraph.DriveItem;
    fileIcon?: string;
    driveItem?: MicrosoftGraph.DriveItem;
    line1Property?: string;
    line2Property?: string;
    line3Property?: string;
    view?: ViewType;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    templateRendered?: (e: Event) => void;
};
export declare type GetProps = {
    resource?: string;
    scopes?: string[];
    version?: string;
    type?: ResponseType;
    maxPages?: number;
    pollingRate?: number;
    cacheEnabled?: boolean;
    cacheInvalidationPeriod?: number;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    dataChange?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type LoginProps = {
    userDetails?: IDynamicPerson;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    loginInitiated?: (e: Event) => void;
    loginCompleted?: (e: Event) => void;
    loginFailed?: (e: Event) => void;
    logoutInitiated?: (e: Event) => void;
    logoutCompleted?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type PeoplePickerProps = {
    groupId?: string;
    type?: PersonType;
    groupType?: GroupType;
    userType?: UserType;
    transitiveSearch?: boolean;
    people?: IDynamicPerson[];
    selectedPeople?: IDynamicPerson[];
    defaultSelectedUserIds?: string[];
    defaultSelectedGroupIds?: string[];
    placeholder?: string;
    selectionMode?: string;
    userIds?: string[];
    showMax?: number;
    disabled?: boolean;
    allowAnyEmail?: boolean;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    selectionChanged?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type PeopleProps = {
    groupId?: string;
    userIds?: string[];
    people?: IDynamicPerson[];
    peopleQueries?: string[];
    showPresence?: boolean;
    personCardInteraction?: PersonCardInteraction;
    resource?: string;
    version?: string;
    scopes?: string[];
    fallbackDetails?: IDynamicPerson[];
    showMax?: number;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    templateRendered?: (e: Event) => void;
};
export declare type PersonCardProps = {
    personDetails?: IDynamicPerson;
    personQuery?: string;
    userId?: string;
    personImage?: string;
    fetchImage?: boolean;
    isExpanded?: boolean;
    inheritDetails?: boolean;
    showPresence?: boolean;
    personPresence?: MicrosoftGraph.Presence;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    expanded?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type PersonProps = {
    config?: MgtPersonConfig;
    personQuery?: string;
    fallbackDetails?: IDynamicPerson;
    userId?: string;
    showPresence?: boolean;
    personDetails?: IDynamicPerson;
    personImage?: string;
    fetchImage?: boolean;
    avatarType?: string;
    personPresence?: MicrosoftGraph.Presence;
    personCardInteraction?: PersonCardInteraction;
    line1Property?: string;
    line2Property?: string;
    line3Property?: string;
    view?: ViewType | PersonViewType;
    avatarSize?: AvatarSize;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    line1clicked?: (e: Event) => void;
    line2clicked?: (e: Event) => void;
    line3clicked?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type TasksProps = {
    res?: TasksStringResource;
    isNewTaskVisible?: boolean;
    readOnly?: boolean;
    dataSource?: TasksSource;
    targetId?: string;
    targetBucketId?: string;
    initialId?: string;
    initialBucketId?: string;
    hideHeader?: boolean;
    hideOptions?: boolean;
    groupId?: string;
    taskFilter?: TaskFilter;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    taskAdded?: (e: Event) => void;
    taskChanged?: (e: Event) => void;
    taskClick?: (e: Event) => void;
    taskRemoved?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type TeamsChannelPickerProps = {
    selectedItem?: SelectedChannel;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    selectionChanged?: (e: Event) => void;
    templateRendered?: (e: Event) => void;
};
export declare type TodoProps = {
    taskFilter?: TodoFilter;
    readOnly?: boolean;
    hideHeader?: boolean;
    hideOptions?: boolean;
    targetId?: string;
    initialId?: string;
    templateContext?: TemplateContext;
    mediaQuery?: ComponentMediaQuery;
    templateRendered?: (e: Event) => void;
};
export declare const Agenda: import("react").ForwardRefExoticComponent<AgendaProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const FileList: import("react").ForwardRefExoticComponent<FileListProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const File: import("react").ForwardRefExoticComponent<FileProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const Get: import("react").ForwardRefExoticComponent<GetProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const Login: import("react").ForwardRefExoticComponent<LoginProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const PeoplePicker: import("react").ForwardRefExoticComponent<PeoplePickerProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const People: import("react").ForwardRefExoticComponent<PeopleProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const PersonCard: import("react").ForwardRefExoticComponent<PersonCardProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const Person: import("react").ForwardRefExoticComponent<PersonProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const Tasks: import("react").ForwardRefExoticComponent<TasksProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const TeamsChannelPicker: import("react").ForwardRefExoticComponent<TeamsChannelPickerProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
export declare const Todo: import("react").ForwardRefExoticComponent<TodoProps & import("react").HTMLAttributes<any> & import("react").RefAttributes<unknown>>;
//# sourceMappingURL=react.d.ts.map