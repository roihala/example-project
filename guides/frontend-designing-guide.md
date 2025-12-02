# Grommet v2 Frontend Designing Guide

A comprehensive guide for building responsive, accessible, and themeable React applications using the Grommet component library.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Core Concepts](#core-concepts)
4. [Layout System](#layout-system)
5. [Typography](#typography)
6. [Color System](#color-system)
7. [Theming](#theming)
8. [Components Reference](#components-reference)
9. [Responsive Design](#responsive-design)
10. [Accessibility](#accessibility)
11. [Best Practices](#best-practices)
12. [Resources](#resources)

---

## Introduction

Grommet is a React-based framework that provides accessibility, modularity, responsiveness, and theming in a tidy package. It's designed to help you build responsive and accessible mobile-first projects for the web.

### Key Features

- **Accessibility**: Built-in support for W3C's WCAG 2.1 spec, including keyboard navigation and screen reader tags
- **Responsive**: Mobile-first design with Flexbox and CSS Grid layouts
- **Themeable**: Powerful theming tools to customize components to match your brand
- **Modular**: Atomic design approach - mix, match, and compose components

### Who Uses Grommet

Grommet is trusted by companies including HPE, Netflix, GE, Uber, Boeing, GitHub, HP, Samsung, Twilio, DXC, MicroFocus, Sony, IBM, and Aruba.

---

## Getting Started

### Installation

**For a new app:**
```bash
npx create-react-app my-app
cd my-app
npm install grommet grommet-icons styled-components
```

**For an existing codebase:**
```bash
npm install grommet grommet-icons styled-components
```

### Basic Setup

```jsx
import React from 'react';
import { Grommet, Box, Button } from 'grommet';

const theme = {
  global: {
    colors: {
      brand: '#7D4CDB',
    },
  },
};

const App = () => (
  <Grommet theme={theme}>
    <Box align="center" background="brand" pad="medium">
      <Button
        label="Hello World"
        primary
        onClick={() => alert('Hello, World!')}
      />
    </Box>
  </Grommet>
);

export default App;
```

---

## Core Concepts

### The Grommet Container

The `<Grommet>` component is the top-level container that provides theming context to all child components.

```jsx
<Grommet theme={customTheme} full>
  {/* Your app content */}
</Grommet>
```

**Props:**
- `theme`: Custom theme object
- `full`: Whether to take up the full viewport
- `plain`: Removes default styling

### Component Composition

Grommet follows atomic design principles. Build complex UIs by composing simple components:

```jsx
<Card height="small" width="small" background="light-1">
  <CardHeader pad="medium">Header</CardHeader>
  <CardBody pad="medium">Body</CardBody>
  <CardFooter pad={{ horizontal: "small" }} background="light-2">
    <Button icon={<Favorite color="red" />} hoverIndicator />
    <Button icon={<ShareOption />} hoverIndicator />
  </CardFooter>
</Card>
```

---

## Layout System

### Box - The Foundation

`Box` is the fundamental layout component in Grommet. It's a container that lays out its contents in one direction using Flexbox.

```jsx
<Box
  direction="row"
  border={{ color: 'brand', size: 'large' }}
  pad="medium"
  gap="small"
>
  <Box pad="small" background="dark-3" />
  <Box pad="medium" background="light-3" />
</Box>
```

**Key Box Props:**

| Prop | Description | Values |
|------|-------------|--------|
| `direction` | Layout direction | `row`, `column`, `row-responsive`, `row-reverse`, `column-reverse` |
| `align` | Cross-axis alignment | `start`, `center`, `end`, `baseline`, `stretch` |
| `justify` | Main-axis alignment | `start`, `center`, `end`, `between`, `around`, `evenly`, `stretch` |
| `pad` | Internal padding | T-shirt sizes or object with sides |
| `margin` | External margin | T-shirt sizes or object with sides |
| `gap` | Space between children | T-shirt sizes |
| `background` | Background color/image | Color name, hex, or object |
| `elevation` | Drop shadow | `none`, `xsmall`, `small`, `medium`, `large`, `xlarge` |
| `round` | Border radius | `xsmall`, `small`, `medium`, `large`, `xlarge`, `full` |
| `border` | Border styling | Boolean, side, or object |
| `fill` | Fill container | `horizontal`, `vertical`, `true`, `false` |
| `flex` | Flex grow/shrink | `grow`, `shrink`, `true`, `false`, or object |
| `width` | Fixed width | T-shirt sizes or CSS value |
| `height` | Fixed height | T-shirt sizes or CSS value |
| `overflow` | Content overflow | `auto`, `hidden`, `scroll`, `visible` |
| `animation` | Entrance animation | `fadeIn`, `slideUp`, `slideDown`, `zoomIn`, etc. |

### Grid - CSS Grid Layout

`Grid` provides a CSS Grid-based layout system for more complex arrangements.

```jsx
<Grid
  rows={['xxsmall', 'xsmall']}
  columns={['xsmall', 'small']}
  gap="small"
  areas={[
    { name: 'header', start: [0, 0], end: [1, 0] },
    { name: 'nav', start: [0, 1], end: [0, 1] },
    { name: 'main', start: [1, 1], end: [1, 1] },
  ]}
>
  <Box gridArea="header" background="brand" />
  <Box gridArea="nav" background="light-5" />
  <Box gridArea="main" background="light-2" />
</Grid>
```

**Key Grid Props:**

| Prop | Description |
|------|-------------|
| `rows` | Row sizes (array or string) |
| `columns` | Column sizes (array, string, or object with count) |
| `areas` | Named grid areas |
| `gap` | Gap between cells |
| `fill` | Fill container |
| `justify` | Horizontal alignment of items |
| `justifyContent` | Horizontal alignment of content |
| `align` | Vertical alignment of items |
| `alignContent` | Vertical alignment of content |

### Layout Components

#### Header
```jsx
<Header background="brand">
  <Button icon={<Home />} hoverIndicator />
  <Menu label="account" items={[{ label: 'logout' }]} />
</Header>
```

Header is a Box with presets: `align="center"`, `direction="row"`, `justify="between"`, `gap="medium"`.

#### Footer
```jsx
<Footer background="light-4" pad="medium">
  <Text>Copyright 2024</Text>
  <Anchor label="About" />
</Footer>
```

#### Sidebar
```jsx
<Sidebar background="brand" pad="small" gap="large">
  <Nav gap="small">
    <Button icon={<Home />} />
    <Button icon={<Settings />} />
  </Nav>
</Sidebar>
```

#### Page & PageHeader
```jsx
<Page>
  <PageHeader
    title="Page Title"
    subtitle="A subtitle for the page"
    parent={<Anchor label="Parent" />}
    actions={<Button label="Action" primary />}
  />
  <PageContent>
    {/* Page content */}
  </PageContent>
</Page>
```

### Layer - Overlays and Modals

```jsx
const [show, setShow] = useState(false);

<Button label="Show" onClick={() => setShow(true)} />
{show && (
  <Layer
    onEsc={() => setShow(false)}
    onClickOutside={() => setShow(false)}
    position="center"
    animation="slide"
  >
    <Box pad="medium">
      <Button label="Close" onClick={() => setShow(false)} />
    </Box>
  </Layer>
)}
```

**Layer Props:**
- `position`: `center`, `top`, `bottom`, `left`, `right`, `top-left`, `top-right`, `bottom-left`, `bottom-right`
- `animation`: `slide`, `fadeIn`, `none`, `true`, `false`
- `full`: `true`, `false`, `horizontal`, `vertical`
- `modal`: Whether to show overlay background
- `plain`: No background color or elevation

### Stack - Layered Content

```jsx
<Stack anchor="top-right">
  <Box pad="medium" background="brand">
    Main content
  </Box>
  <Box background="status-critical" pad="xsmall">
    Badge
  </Box>
</Stack>
```

---

## Typography

### Heading

```jsx
<Heading level={1} margin="none">Chapter 1</Heading>
<Heading level={2} size="small">Section Title</Heading>
```

**Props:**
- `level`: 1-6 (corresponds to h1-h6)
- `size`: `small`, `medium`, `large`, `xlarge`
- `color`: Text color
- `textAlign`: `start`, `center`, `end`, `justify`
- `truncate`: Truncate with ellipsis
- `weight`: Font weight
- `margin`: Margin around heading

### Text

```jsx
<Text size="large" weight="bold" color="brand">
  Styled text
</Text>
```

**Props:**
- `size`: `xsmall`, `small`, `medium`, `large`, `xlarge`, `xxlarge`, `2xl`-`6xl`
- `weight`: `normal`, `bold`, `lighter`, `bolder`, or number
- `color`: Text color
- `textAlign`: Text alignment
- `truncate`: Truncate with ellipsis (use `"tip"` to show full text on hover)
- `wordBreak`: `normal`, `break-all`, `keep-all`, `break-word`

### Paragraph

```jsx
<Paragraph size="large" fill>
  A paragraph of text content that respects maximum width for readability.
</Paragraph>
```

### Markdown

```jsx
<Markdown>
  {`# Heading

  This is **bold** and this is *italic*.

  - List item 1
  - List item 2
  `}
</Markdown>
```

---

## Color System

### Default Color Palette

#### Brand & Control
| Name | Light | Dark |
|------|-------|------|
| `brand` | #7D4CDB | #7D4CDB |
| `control` | brand | accent-1 |
| `focus` | #6FFFB0 | #6FFFB0 |

#### Background
| Name | Light | Dark |
|------|-------|------|
| `background` | #ffffff | #000000 |
| `background-back` | #EDEDED | #33333308 |
| `background-front` | #FFFFFF | #444444 |
| `background-contrast` | #33333310 | #FFFFFF18 |

#### Text
| Name | Light | Dark |
|------|-------|------|
| `text` | #444444 | #f8f8f8 |
| `text-strong` | #000000 | #FFFFFF |
| `text-weak` | #555555 | #CCCCCC |
| `text-xweak` | #666666 | #BBBBBB |

#### Status Colors
| Name | Value |
|------|-------|
| `status-critical` | #EB0000 |
| `status-error` | #B30000 |
| `status-warning` | #C27B00 |
| `status-ok` | #009E67 |
| `status-unknown` | #919191 |
| `status-disabled` | #CCCCCC |

#### Accent Colors
| Name | Value |
|------|-------|
| `accent-1` | #6FFFB0 |
| `accent-2` | #FD6FFF |
| `accent-3` | #81FCED |
| `accent-4` | #FFCA58 |

#### Neutral Colors
| Name | Value |
|------|-------|
| `neutral-1` | #00873D |
| `neutral-2` | #3D138D |
| `neutral-3` | #00739D |
| `neutral-4` | #A2423D |

#### Light/Dark Shades
- `light-1` through `light-6`: Shades from #F8F8F8 to #DADADA
- `dark-1` through `dark-6`: Shades from #333333 to #999999

### Using Colors

```jsx
// As background
<Box background="brand" />
<Box background={{ color: 'brand', opacity: 'medium' }} />
<Box background={{ dark: 'dark-1', light: 'light-1' }} />

// As text color
<Text color="status-critical">Error message</Text>

// With gradients
<Box background="linear-gradient(102.77deg, #865CD6 0%, #7D4CDB 100%)" />
```

---

## Theming

### Theme Structure

```javascript
const customTheme = {
  global: {
    colors: {
      brand: '#228BE6',
      'accent-1': '#FF6B6B',
      focus: '#228BE6',
      // Custom colors
      'custom-color': '#123456',
    },
    font: {
      family: 'Roboto, sans-serif',
      size: '18px',
      height: '24px',
    },
    breakpoints: {
      small: { value: 768 },
      medium: { value: 1536 },
      large: {},
    },
    edgeSize: {
      none: '0px',
      hair: '1px',
      xxsmall: '3px',
      xsmall: '6px',
      small: '12px',
      medium: '24px',
      large: '48px',
      xlarge: '96px',
    },
    elevation: {
      light: {
        small: '0px 2px 4px rgba(0, 0, 0, 0.20)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.20)',
      },
      dark: {
        small: '0px 2px 4px rgba(255, 255, 255, 0.20)',
        medium: '0px 4px 8px rgba(255, 255, 255, 0.20)',
      },
    },
  },
  button: {
    border: {
      radius: '8px',
    },
    padding: {
      horizontal: '24px',
      vertical: '12px',
    },
    primary: {
      color: 'white',
      background: { color: 'brand' },
    },
  },
  heading: {
    level: {
      1: {
        medium: {
          size: '48px',
          height: '56px',
        },
      },
    },
  },
};
```

### Applying Themes

```jsx
import { Grommet, grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';

// Extend the default theme
const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      brand: '#228BE6',
    },
  },
});

<Grommet theme={customTheme}>
  {/* App content */}
</Grommet>
```

### ThemeContext - Local Theme Overrides

```jsx
import { ThemeContext } from 'grommet';

<ThemeContext.Extend
  value={{
    global: {
      colors: {
        brand: '#FF0000',
      },
    },
  }}
>
  <Box background="brand">
    This uses the overridden brand color
  </Box>
</ThemeContext.Extend>
```

### Global Theme Properties

Key global properties that affect multiple components:

| Property | Description |
|----------|-------------|
| `global.active.background` | Background for active elements |
| `global.active.color` | Text color for active elements |
| `global.animation` | Animation configuration |
| `global.borderSize` | Border size definitions |
| `global.breakpoints` | Responsive breakpoints |
| `global.colors` | Color palette |
| `global.control.border` | Border styling for controls |
| `global.control.disabled.opacity` | Opacity for disabled controls |
| `global.drop.background` | Background for Drop components |
| `global.edgeSize` | Spacing values for gap, margin, pad |
| `global.elevation` | Shadow definitions |
| `global.focus.border` | Focus border styling |
| `global.focus.outline` | Focus outline styling |
| `global.focus.shadow` | Focus shadow styling |
| `global.font` | Font family, size, height, weight |
| `global.hover.background` | Hover background |
| `global.hover.color` | Hover text color |
| `global.input.padding` | Input padding |
| `global.opacity` | Opacity values (weak, medium, strong) |
| `global.size` | Size values for width/height |
| `global.spacing` | Base spacing unit |

---

## Components Reference

### Controls

#### Button

```jsx
// Primary button
<Button primary label="Submit" onClick={() => {}} />

// Secondary button
<Button secondary label="Cancel" onClick={() => {}} />

// Icon button
<Button icon={<Add />} onClick={() => {}} a11yTitle="Add item" />

// With icon and label
<Button icon={<Add />} label="Add" onClick={() => {}} />

// Busy state
<Button busy label="Loading..." />

// With badge
<Button icon={<Notification />} badge={3} />
```

**Button Kinds:**
- **Default**: Context-driven affordance, used for most buttons
- **Primary**: Main call-to-action, typically one per screen
- **Secondary**: Extra attention without being the primary action

#### Anchor

```jsx
<Anchor href="https://example.com" label="Link" />
<Anchor href="/page" label="Internal Link" />
```

#### Menu

```jsx
<Menu
  label="Actions"
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
  ]}
/>
```

#### DropButton

```jsx
<DropButton
  label="Options"
  dropContent={
    <Box pad="medium">
      Dropdown content
    </Box>
  }
/>
```

#### Tabs

```jsx
<Tabs>
  <Tab title="Tab 1">
    <Box pad="medium">Content 1</Box>
  </Tab>
  <Tab title="Tab 2">
    <Box pad="medium">Content 2</Box>
  </Tab>
</Tabs>
```

#### Accordion

```jsx
<Accordion>
  <AccordionPanel label="Panel 1">
    <Box pad="medium">Content 1</Box>
  </AccordionPanel>
  <AccordionPanel label="Panel 2">
    <Box pad="medium">Content 2</Box>
  </AccordionPanel>
</Accordion>
```

### Input Components

#### Form & FormField

```jsx
<Form
  value={formValue}
  onChange={nextValue => setFormValue(nextValue)}
  onSubmit={({ value }) => console.log(value)}
>
  <FormField name="name" label="Name" required>
    <TextInput name="name" />
  </FormField>
  <FormField name="email" label="Email">
    <TextInput name="email" type="email" />
  </FormField>
  <Box direction="row" gap="medium">
    <Button type="submit" primary label="Submit" />
    <Button type="reset" label="Reset" />
  </Box>
</Form>
```

**Form Modes:**
- **Controlled**: Value managed by parent component via `value` and `onChange`
- **Uncontrolled**: Value managed internally by Form

#### TextInput

```jsx
<TextInput
  placeholder="Enter text..."
  value={value}
  onChange={event => setValue(event.target.value)}
  suggestions={['Option 1', 'Option 2']}
/>
```

#### TextArea

```jsx
<TextArea
  placeholder="Enter description..."
  value={value}
  onChange={event => setValue(event.target.value)}
  resize="vertical"
/>
```

#### Select

```jsx
<Select
  options={['Option 1', 'Option 2', 'Option 3']}
  value={value}
  onChange={({ option }) => setValue(option)}
  placeholder="Select an option"
/>
```

#### SelectMultiple

```jsx
<SelectMultiple
  options={['Option 1', 'Option 2', 'Option 3']}
  value={values}
  onChange={({ value }) => setValues(value)}
/>
```

#### CheckBox & CheckBoxGroup

```jsx
<CheckBox
  label="Accept terms"
  checked={checked}
  onChange={event => setChecked(event.target.checked)}
/>

<CheckBoxGroup
  options={['Option 1', 'Option 2', 'Option 3']}
  value={selected}
  onChange={({ value }) => setSelected(value)}
/>
```

#### RadioButtonGroup

```jsx
<RadioButtonGroup
  name="options"
  options={['Option 1', 'Option 2', 'Option 3']}
  value={value}
  onChange={event => setValue(event.target.value)}
/>
```

#### DateInput

```jsx
<DateInput
  format="mm/dd/yyyy"
  value={date}
  onChange={({ value }) => setDate(value)}
/>
```

#### RangeInput

```jsx
<RangeInput
  min={0}
  max={100}
  value={value}
  onChange={event => setValue(event.target.value)}
/>
```

#### FileInput

```jsx
<FileInput
  name="file"
  onChange={event => setFiles(event.target.files)}
  multiple
/>
```

#### MaskedInput

```jsx
<MaskedInput
  mask={[
    { fixed: '(' },
    { length: 3, regexp: /^[0-9]+$/ },
    { fixed: ')' },
    { fixed: ' ' },
    { length: 3, regexp: /^[0-9]+$/ },
    { fixed: '-' },
    { length: 4, regexp: /^[0-9]+$/ },
  ]}
  value={phone}
  onChange={event => setPhone(event.target.value)}
/>
```

### Visualization Components

#### DataTable

```jsx
<DataTable
  columns={[
    { property: 'name', header: 'Name', primary: true },
    { property: 'email', header: 'Email' },
    {
      property: 'status',
      header: 'Status',
      render: datum => (
        <Box background={datum.status === 'active' ? 'status-ok' : 'status-warning'} pad="xsmall">
          {datum.status}
        </Box>
      ),
    },
  ]}
  data={[
    { name: 'John', email: 'john@example.com', status: 'active' },
    { name: 'Jane', email: 'jane@example.com', status: 'pending' },
  ]}
  sortable
  paginate
/>
```

**DataTable Features:**
- Sorting via `sortable` prop
- Pagination via `paginate` prop
- Row selection via `onSelect` prop
- Grouping via `groupBy` prop
- Resizable columns via `resizeable` prop
- Pinned headers/columns via `pin` prop

#### List

```jsx
<List
  data={['Item 1', 'Item 2', 'Item 3']}
  primaryKey="name"
  onClickItem={({ item }) => console.log(item)}
/>
```

#### Cards

```jsx
<Cards
  data={items}
  children={(item) => (
    <Card key={item.id} pad="medium">
      <CardHeader>{item.title}</CardHeader>
      <CardBody>{item.description}</CardBody>
    </Card>
  )}
/>
```

#### Chart & DataChart

```jsx
<DataChart
  data={[
    { date: '2024-01', value: 10 },
    { date: '2024-02', value: 20 },
    { date: '2024-03', value: 15 },
  ]}
  series={['date', 'value']}
  chart={[
    { property: 'value', type: 'line', opacity: 'medium' },
    { property: 'value', type: 'point', thickness: 'medium' },
  ]}
/>
```

#### Meter

```jsx
<Meter
  type="circle"
  values={[{ value: 60 }]}
  size="small"
  thickness="medium"
/>
```

#### Spinner

```jsx
<Spinner size="medium" />
```

#### Notification

```jsx
<Notification
  toast
  status="warning"
  title="Warning"
  message="Something needs attention"
  onClose={() => {}}
/>
```

### Media Components

#### Image

```jsx
<Image
  src="/path/to/image.jpg"
  alt="Description"
  fit="cover"
  fill
/>
```

#### Video

```jsx
<Video controls>
  <source src="/video.mp4" type="video/mp4" />
</Video>
```

#### Carousel

```jsx
<Carousel controls="arrows">
  <Image src="/slide1.jpg" fit="cover" />
  <Image src="/slide2.jpg" fit="cover" />
  <Image src="/slide3.jpg" fit="cover" />
</Carousel>
```

#### Avatar

```jsx
<Avatar src="/avatar.jpg" size="medium" />
<Avatar background="brand">JD</Avatar>
```

### Utility Components

#### InfiniteScroll

```jsx
<Box height="medium" overflow="auto">
  <InfiniteScroll items={items} onMore={() => loadMore()}>
    {(item) => <Box key={item.id}>{item.name}</Box>}
  </InfiniteScroll>
</Box>
```

#### Collapsible

```jsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(!open)} label="Toggle" />
<Collapsible open={open}>
  <Box pad="medium" background="light-2">
    Collapsible content
  </Box>
</Collapsible>
```

#### Keyboard

```jsx
<Keyboard onEsc={() => closeModal()} onEnter={() => submit()}>
  <Box>
    Content with keyboard handlers
  </Box>
</Keyboard>
```

#### SkipLinks

```jsx
<SkipLinks>
  <SkipLink id="main" label="Skip to main content" />
</SkipLinks>
```

#### Tip

```jsx
<Tip content="Helpful information">
  <Button icon={<Help />} />
</Tip>
```

---

## Responsive Design

### ResponsiveContext

Use `ResponsiveContext` to render different layouts based on viewport size.

```jsx
import { ResponsiveContext } from 'grommet';

const MyComponent = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box direction={size === 'small' ? 'column' : 'row'}>
      <Sidebar />
      <Main />
    </Box>
  );
};
```

### Breakpoints

Default breakpoints:

| Name | Value | Description |
|------|-------|-------------|
| `small` | 768px | Mobile devices |
| `medium` | 1536px | Tablets and small desktops |
| `large` | (no limit) | Large desktops |

### Responsive Props

Many components support responsive behavior:

```jsx
// Box direction changes on small screens
<Box direction="row-responsive">
  <Box>Sidebar</Box>
  <Box>Content</Box>
</Box>

// Grid with responsive columns
<Grid
  columns={{
    count: 'fit',
    size: 'medium',
  }}
  gap="small"
>
  {items.map(item => <Card key={item.id}>{item.name}</Card>)}
</Grid>
```

### Responsive Configuration in Theme

```javascript
const theme = {
  global: {
    breakpoints: {
      small: {
        value: 768,
        edgeSize: {
          small: '6px',
          medium: '12px',
          large: '24px',
        },
      },
      medium: {
        value: 1536,
      },
      large: {},
    },
  },
};
```

---

## Accessibility

### Built-in Features

Grommet provides accessibility support out of the box:

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and roles
- **Focus Management**: Visible focus indicators
- **Skip Links**: Navigation assistance for keyboard users

### Best Practices

#### Use Semantic Elements

```jsx
// Use appropriate heading levels
<Heading level={1}>Page Title</Heading>
<Heading level={2}>Section Title</Heading>

// Use semantic layout components
<Header>...</Header>
<Main>...</Main>
<Footer>...</Footer>
```

#### Provide Labels

```jsx
// For icon-only buttons
<Button icon={<Add />} a11yTitle="Add new item" />

// For form fields
<FormField label="Email" name="email" htmlFor="email-input">
  <TextInput id="email-input" name="email" />
</FormField>
```

#### Use SkipLinks

```jsx
<Grommet>
  <SkipLinks>
    <SkipLink id="main" label="Skip to main content" />
    <SkipLink id="nav" label="Skip to navigation" />
  </SkipLinks>
  <Header>
    <Nav id="nav">...</Nav>
  </Header>
  <Main id="main">...</Main>
</Grommet>
```

#### Announce Dynamic Content

```jsx
import { AnnounceContext } from 'grommet';

const announce = useContext(AnnounceContext);

// Announce changes for screen readers
announce('Item added successfully', 'polite');
```

---

## Best Practices

### Component Organization

1. **Use Semantic Layout Components**
   - `Header`, `Footer`, `Sidebar`, `Main` for page structure
   - `Card`, `CardHeader`, `CardBody`, `CardFooter` for content containers

2. **Compose with Box and Grid**
   - Start with `Box` for simple flex layouts
   - Use `Grid` for complex 2D layouts
   - Avoid deeply nested structures

3. **Leverage Theme**
   - Define colors, spacing, and typography in theme
   - Use theme values instead of hardcoded values
   - Create component-specific theme overrides

### Performance

1. **Use Skeleton Loading**
   ```jsx
   <Box skeleton>
     <Heading>Loading...</Heading>
     <Paragraph>Content loading...</Paragraph>
   </Box>
   ```

2. **Lazy Load with InfiniteScroll**
   ```jsx
   <InfiniteScroll items={items} onMore={loadMore} />
   ```

3. **Replace Offscreen Content**
   ```jsx
   <DataTable replace data={largeDataset} />
   ```

### Form Handling

1. **Use Controlled Forms for Complex State**
   ```jsx
   <Form
     value={formValue}
     onChange={setFormValue}
     onValidate={setErrors}
     validate="blur"
   />
   ```

2. **Validate on Blur or Submit**
   ```jsx
   <Form validate="blur">
     <FormField
       name="email"
       validate={(value) => {
         if (!value.includes('@')) return 'Invalid email';
       }}
     />
   </Form>
   ```

### Styling

1. **Use Theme-Based Values**
   ```jsx
   // Good
   <Box pad="medium" margin="small" />

   // Avoid
   <Box pad="24px" margin="12px" />
   ```

2. **Use Color Names**
   ```jsx
   // Good
   <Box background="brand" />

   // Avoid (unless custom color needed)
   <Box background="#7D4CDB" />
   ```

3. **Extend Styles When Needed**
   ```jsx
   // In theme
   const theme = {
     box: {
       extend: css`
         transition: all 0.2s ease;
       `,
     },
   };
   ```

---

## Resources

### Official Resources

- [Grommet Documentation](https://v2.grommet.io/docs)
- [Component Reference](https://v2.grommet.io/components)
- [Storybook Examples](https://storybook.grommet.io/)
- [GitHub Repository](https://github.com/grommet/grommet)

### Tools

- [Grommet Designer](https://designer.grommet.io/) - Visual design tool
- [Grommet Themer](https://theme-designer.grommet.io/) - Theme customization tool
- [Grommet Icons](https://icons.grommet.io/) - Icon library

### Community

- [Slack Community](https://slack-invite.grommet.io/)
- [Twitter @grommet_io](https://twitter.com/grommet_io)
- [CodeSandbox Examples](https://codesandbox.io/u/grommetux/sandboxes)

### Starter Templates

- [New App Starter](https://github.com/grommet/grommet-starter-new-app)
- [Existing App Integration](https://github.com/grommet/grommet-starter-existing-app)

### Browser Support

Grommet supports the latest versions of:
- Apple Safari (mobile and desktop)
- Google Chrome (mobile and desktop)
- Microsoft Edge
- Mozilla Firefox

---

## Quick Reference

### T-Shirt Sizing Scale

| Size | Edge (px) | Border (px) |
|------|-----------|-------------|
| `hair` | 1 | - |
| `xxsmall` | 3 | 1 |
| `xsmall` | 6 | 2 |
| `small` | 12 | 2 |
| `medium` | 24 | 4 |
| `large` | 48 | 12 |
| `xlarge` | 96 | 24 |

### Common Import Pattern

```jsx
import {
  // Layout
  Box, Grid, Layer, Stack,
  Header, Footer, Sidebar, Main,
  Page, PageHeader, PageContent,

  // Typography
  Heading, Text, Paragraph, Markdown,

  // Controls
  Button, Anchor, Menu, DropButton,
  Tabs, Tab, Accordion, AccordionPanel,

  // Forms
  Form, FormField, TextInput, TextArea,
  Select, CheckBox, RadioButtonGroup,

  // Data
  DataTable, List, Cards, Card,

  // Feedback
  Spinner, Notification, Tip,

  // Context
  Grommet, ResponsiveContext, ThemeContext,
} from 'grommet';

import { Add, Close, Menu as MenuIcon } from 'grommet-icons';
```

---

*This guide is based on Grommet v2 documentation. For the most up-to-date information, visit [v2.grommet.io](https://v2.grommet.io).*
