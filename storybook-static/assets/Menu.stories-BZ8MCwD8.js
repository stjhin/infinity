import{R as t,r as L}from"./iframe-DF7qmear.js";import{T as B,D as R,b as j,C as z,S as H}from"./blocks-BSNjL49v.js";import{M as F}from"./Menu-BTJqjVQI.js";import{e as P,p}from"./controlGroups-C3L5pzxR.js";import"./preload-helper-C1FmrZbK.js";import"./index-Gw9QuGag.js";const r={generatedAt:new Date().toISOString(),componentDescription:"A dropdown menu list for selecting options. Each item shows a checkbox, label, and optional subtitle. Supports Default, Hover, Selected, and Focus states per the Figma design system.",figmaUrl:"https://www.figma.com/design/asvaeYj4SwE9iBsdlehuzf?node-id=6-1019",argDescriptions:{showCheckbox:"Whether to show the checkbox on each item (default true)",showSubtitle:"Whether to show the subtitle text on each item (default true)"},variantDescriptions:{selected:"Selected state: white background, checkbox filled with brand purple (#5E4DB2) and white checkmark."}};var h,d;const Q={title:"Components/Menu",component:F,tags:["autodocs"],parameters:{design:{type:"figma",url:r.figmaUrl},docs:{description:{component:r.componentDescription},page:()=>t.createElement(t.Fragment,null,t.createElement(B,null),t.createElement(R,{of:"meta"}),t.createElement(j,null),t.createElement(z,null),t.createElement(H,{title:"Variants"}))}},argTypes:{showCheckbox:p({name:"Show checkbox",description:(h=r.argDescriptions)==null?void 0:h.showCheckbox,control:{type:"boolean"}}),showSubtitle:p({name:"Show subtitle",description:(d=r.argDescriptions)==null?void 0:d.showSubtitle,control:{type:"boolean"}}),onChange:P({control:!1})}},c=[{label:"Option 1",subtitle:"This is a subtitle",value:"opt1"},{label:"Option 2",subtitle:"Another subtitle here",value:"opt2"},{label:"Option 3",subtitle:"Third option description",value:"opt3"},{label:"Option 4",value:"opt4"}];function n({value:e=null,onChange:m,...I}){const[O,U]=L.useState(e);return t.createElement(F,{...I,value:O,onChange:u=>{U(_=>_===u?null:u),m&&m(u)}})}const o={render:e=>t.createElement(n,{...e}),args:{items:c,showCheckbox:!0,showSubtitle:!0,value:null}};var b;const s={render:e=>t.createElement(n,{...e}),name:"With selection",parameters:{docs:{description:{story:(b=r.variantDescriptions)==null?void 0:b.selected}}},args:{items:c,showCheckbox:!0,showSubtitle:!0,value:"opt2"}},a={render:e=>t.createElement(n,{...e}),name:"Without checkbox",args:{items:c.map(e=>({...e})),showCheckbox:!1,showSubtitle:!0,value:null}},i={render:e=>t.createElement(n,{...e}),name:"Without subtitles",args:{items:c.map(e=>({...e})),showCheckbox:!0,showSubtitle:!1,value:null}},l={render:e=>t.createElement(n,{...e}),name:"Single item",args:{items:[{label:"Only option",subtitle:"The one and only",value:"single"}],showCheckbox:!0,showSubtitle:!0,value:null}};var g,S,w;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <MenuWrapper {...args} />,
  args: {
    items: DEFAULT_ITEMS,
    showCheckbox: true,
    showSubtitle: true,
    value: null
  }
}`,...(w=(S=o.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var f,E,x;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...(x=(E=s.parameters)==null?void 0:E.docs)==null?void 0:x.source}}};var k,v,C;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(C=(v=a.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var D,W,T;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(T=(W=i.parameters)==null?void 0:W.docs)==null?void 0:T.source}}};var M,y,A;l.parameters={...l.parameters,docs:{...(M=l.parameters)==null?void 0:M.docs,source:{originalSource:`{
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
}`,...(A=(y=l.parameters)==null?void 0:y.docs)==null?void 0:A.source}}};const V=["Default","WithSelection","WithoutCheckbox","WithoutSubtitles","SingleItem"];export{o as Default,l as SingleItem,s as WithSelection,a as WithoutCheckbox,i as WithoutSubtitles,V as __namedExportsOrder,Q as default};
