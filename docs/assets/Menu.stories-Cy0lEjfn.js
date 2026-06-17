import{R as t,r as U}from"./iframe-BCz922t-.js";import{M as I}from"./Menu-wrp1mmS5.js";import{e as R,p as h}from"./controlGroups-BrjsdoFJ.js";import"./preload-helper-C1FmrZbK.js";const l={generatedAt:new Date().toISOString(),componentDescription:"A dropdown menu list for selecting options. Each item shows a checkbox, label, and optional subtitle. Supports Default, Hover, Selected, and Focus states per the Figma design system.",argDescriptions:{showCheckbox:"Whether to show the checkbox on each item (default true)",showSubtitle:"Whether to show the subtitle text on each item (default true)"},variantDescriptions:{selected:"Selected state: white background, checkbox filled with brand purple (#5E4DB2) and white checkmark."}};var m,b;const z={title:"Components/Menu",component:I,tags:["autodocs"],parameters:{docs:{description:{component:l.componentDescription}}},argTypes:{showCheckbox:h({name:"Show checkbox",description:(m=l.argDescriptions)==null?void 0:m.showCheckbox,control:{type:"boolean"}}),showSubtitle:h({name:"Show subtitle",description:(b=l.argDescriptions)==null?void 0:b.showSubtitle,control:{type:"boolean"}}),onChange:R({control:!1})}},c=[{label:"Option 1",subtitle:"This is a subtitle",value:"opt1"},{label:"Option 2",subtitle:"Another subtitle here",value:"opt2"},{label:"Option 3",subtitle:"Third option description",value:"opt3"},{label:"Option 4",value:"opt4"}];function o({value:e=null,onChange:p,...F}){const[O,_]=U.useState(e);return t.createElement(I,{...F,value:O,onChange:u=>{_(L=>L===u?null:u),p&&p(u)}})}const r={render:e=>t.createElement(o,{...e}),args:{items:c,showCheckbox:!0,showSubtitle:!0,value:null}};var d;const n={render:e=>t.createElement(o,{...e}),name:"With selection",parameters:{docs:{description:{story:(d=l.variantDescriptions)==null?void 0:d.selected}}},args:{items:c,showCheckbox:!0,showSubtitle:!0,value:"opt2"}},s={render:e=>t.createElement(o,{...e}),name:"Without checkbox",args:{items:c.map(e=>({...e})),showCheckbox:!1,showSubtitle:!0,value:null}},a={render:e=>t.createElement(o,{...e}),name:"Without subtitles",args:{items:c.map(e=>({...e})),showCheckbox:!0,showSubtitle:!1,value:null}},i={render:e=>t.createElement(o,{...e}),name:"Single item",args:{items:[{label:"Only option",subtitle:"The one and only",value:"single"}],showCheckbox:!0,showSubtitle:!0,value:null}};var g,S,w;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <MenuWrapper {...args} />,
  args: {
    items: DEFAULT_ITEMS,
    showCheckbox: true,
    showSubtitle: true,
    value: null
  }
}`,...(w=(S=r.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var x,k,v;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <MenuWrapper {...args} />,
  name: 'With selection',
  parameters: {
    docs: {
      description: {
        story: figmaDocs.variantDescriptions?.selected
      }
    }
  },
  args: {
    items: DEFAULT_ITEMS,
    showCheckbox: true,
    showSubtitle: true,
    value: 'opt2'
  }
}`,...(v=(k=n.parameters)==null?void 0:k.docs)==null?void 0:v.source}}};var f,C,D;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <MenuWrapper {...args} />,
  name: 'Without checkbox',
  args: {
    items: DEFAULT_ITEMS.map(item => ({
      ...item
    })),
    showCheckbox: false,
    showSubtitle: true,
    value: null
  }
}`,...(D=(C=s.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var E,W,T;a.parameters={...a.parameters,docs:{...(E=a.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <MenuWrapper {...args} />,
  name: 'Without subtitles',
  args: {
    items: DEFAULT_ITEMS.map(item => ({
      ...item
    })),
    showCheckbox: true,
    showSubtitle: false,
    value: null
  }
}`,...(T=(W=a.parameters)==null?void 0:W.docs)==null?void 0:T.source}}};var M,y,A;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  render: args => <MenuWrapper {...args} />,
  name: 'Single item',
  args: {
    items: [{
      label: 'Only option',
      subtitle: 'The one and only',
      value: 'single'
    }],
    showCheckbox: true,
    showSubtitle: true,
    value: null
  }
}`,...(A=(y=i.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};const G=["Default","WithSelection","WithoutCheckbox","WithoutSubtitles","SingleItem"];export{r as Default,i as SingleItem,n as WithSelection,s as WithoutCheckbox,a as WithoutSubtitles,G as __namedExportsOrder,z as default};
