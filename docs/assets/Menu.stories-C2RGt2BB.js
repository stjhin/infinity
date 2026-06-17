import{R as t,r as U}from"./iframe-BS0JH9Ka.js";import{T as R,D as B,b as H,C as P,S as j}from"./blocks-BuF6xFpI.js";import{M as F}from"./Menu-hPIZSXxU.js";import{e as q,p}from"./controlGroups-B-vQVNIg.js";import"./preload-helper-C1FmrZbK.js";import"./index-B-01DoiO.js";const i={generatedAt:new Date().toISOString(),componentDescription:"A dropdown menu list for selecting options. Each item shows a checkbox, label, and optional subtitle. Supports Default, Hover, Selected, and Focus states per the Figma design system.",argDescriptions:{showCheckbox:"Whether to show the checkbox on each item (default true)",showSubtitle:"Whether to show the subtitle text on each item (default true)"},variantDescriptions:{selected:"Selected state: white background, checkbox filled with brand purple (#5E4DB2) and white checkmark."}};var h,b;const V={title:"Components/Menu",component:F,tags:["autodocs"],parameters:{docs:{description:{component:i.componentDescription},page:()=>t.createElement(t.Fragment,null,t.createElement(R,null),t.createElement(B,{of:"meta"}),t.createElement(H,null),t.createElement(P,null),t.createElement(j,{title:"Variants"}))}},argTypes:{showCheckbox:p({name:"Show checkbox",description:(h=i.argDescriptions)==null?void 0:h.showCheckbox,control:{type:"boolean"}}),showSubtitle:p({name:"Show subtitle",description:(b=i.argDescriptions)==null?void 0:b.showSubtitle,control:{type:"boolean"}}),onChange:q({control:!1})}},c=[{label:"Option 1",subtitle:"This is a subtitle",value:"opt1"},{label:"Option 2",subtitle:"Another subtitle here",value:"opt2"},{label:"Option 3",subtitle:"Third option description",value:"opt3"},{label:"Option 4",value:"opt4"}];function r({value:e=null,onChange:m,...I}){const[O,_]=U.useState(e);return t.createElement(F,{...I,value:O,onChange:u=>{_(L=>L===u?null:u),m&&m(u)}})}const n={render:e=>t.createElement(r,{...e}),args:{items:c,showCheckbox:!0,showSubtitle:!0,value:null}};var d;const o={render:e=>t.createElement(r,{...e}),name:"With selection",parameters:{docs:{description:{story:(d=i.variantDescriptions)==null?void 0:d.selected}}},args:{items:c,showCheckbox:!0,showSubtitle:!0,value:"opt2"}},s={render:e=>t.createElement(r,{...e}),name:"Without checkbox",args:{items:c.map(e=>({...e})),showCheckbox:!1,showSubtitle:!0,value:null}},a={render:e=>t.createElement(r,{...e}),name:"Without subtitles",args:{items:c.map(e=>({...e})),showCheckbox:!0,showSubtitle:!1,value:null}},l={render:e=>t.createElement(r,{...e}),name:"Single item",args:{items:[{label:"Only option",subtitle:"The one and only",value:"single"}],showCheckbox:!0,showSubtitle:!0,value:null}};var g,S,w;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <MenuWrapper {...args} />,
  args: {
    items: DEFAULT_ITEMS,
    showCheckbox: true,
    showSubtitle: true,
    value: null
  }
}`,...(w=(S=n.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var E,x,k;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(k=(x=o.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var v,f,C;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(C=(f=s.parameters)==null?void 0:f.docs)==null?void 0:C.source}}};var D,W,T;a.parameters={...a.parameters,docs:{...(D=a.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(T=(W=a.parameters)==null?void 0:W.docs)==null?void 0:T.source}}};var M,y,A;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(A=(y=l.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};const X=["Default","WithSelection","WithoutCheckbox","WithoutSubtitles","SingleItem"];export{n as Default,l as SingleItem,o as WithSelection,s as WithoutCheckbox,a as WithoutSubtitles,X as __namedExportsOrder,V as default};
