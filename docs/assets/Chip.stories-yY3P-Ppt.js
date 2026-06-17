import{R as r}from"./iframe-BS0JH9Ka.js";import{T as pe,D as fe,b as ue,C as me,S as he}from"./blocks-BuF6xFpI.js";import{t as e,i as be,e as w,p as n}from"./controlGroups-B-vQVNIg.js";import{g as ge}from"./googleIconNames-Bon9gHIP.js";import"./preload-helper-C1FmrZbK.js";import"./index-B-01DoiO.js";function g({label:i="Chip",state:b="enabled",variant:v="filled",hasLeftIcon:Z=!0,hasCancel:ee=!0,iconColor:x,leftIconName:S="dark_mode",onClick:C,onCancel:y,disabled:re=!1,className:ae="",...oe}){const t=re||b==="disabled",I=x!=null?be(x):null,te=(()=>{const a=v==="filled";return t?{"--chip-bg":e("color.asx-mono.200","#b6c2cf"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:b==="pressed"?a?{"--chip-bg":e("color.asx-purple.1000","#2b273f"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:{"--chip-bg":e("color.asx-purple.200","#dfd8fd"),"--chip-border-color":e("color.asx-purple.800","#5e4db2"),"--chip-border-width":"2px","--chip-text-color":e("color.asx-purple.800","#5e4db2"),"--chip-icon-color":e("color.asx-purple.800","#5e4db2")}:b==="hover"?a?{"--chip-bg":e("color.asx-purple.900","#352c63"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:{"--chip-bg":e("color.asx-purple.200","#dfd8fd"),"--chip-border-color":e("color.asx-purple.800","#5e4db2"),"--chip-border-width":"1px","--chip-text-color":e("color.asx-purple.800","#5e4db2"),"--chip-icon-color":e("color.asx-purple.800","#5e4db2")}:a?{"--chip-bg":e("color.asx-purple.800","#5e4db2"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:{"--chip-bg":e("global.bg.white","#ffffff"),"--chip-border-color":e("color.asx-purple.800","#5e4db2"),"--chip-border-width":"1px","--chip-text-color":e("color.asx-purple.800","#5e4db2"),"--chip-icon-color":e("color.asx-purple.800","#5e4db2")}})(),ne=["chip",`chip--${v}`,t?"chip--disabled":"",ae],{style:le,...se}=oe||{},ie={...te,...I?{"--chip-icon-color":I}:{},...le||{}},ce=a=>{t||C&&C(a)},de=a=>{a.stopPropagation(),!t&&y&&y(a)};return r.createElement("div",{className:ne.filter(Boolean).join(" "),style:ie,onClick:ce,role:"button","aria-disabled":t||void 0,tabIndex:t?-1:0,...se},Z&&S&&r.createElement("span",{className:"chip__icon","aria-hidden":!0},r.createElement("span",{className:"material-symbols-rounded"},S)),r.createElement("span",{className:"chip__label"},i),ee&&r.createElement("span",{className:"chip__cancel","aria-label":`Remove ${i}`,role:"button",onClick:de,tabIndex:t?-1:0},r.createElement("span",{className:"material-symbols-rounded"},"close")))}g.__docgenInfo={description:"",methods:[],displayName:"Chip",props:{label:{defaultValue:{value:"'Chip'",computed:!1},required:!1},state:{defaultValue:{value:"'enabled'",computed:!1},required:!1},variant:{defaultValue:{value:"'filled'",computed:!1},required:!1},hasLeftIcon:{defaultValue:{value:"true",computed:!1},required:!1},hasCancel:{defaultValue:{value:"true",computed:!1},required:!1},leftIconName:{defaultValue:{value:"'dark_mode'",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const o={generatedAt:new Date().toISOString(),componentDescription:"A compact chip/tag component for displaying labels, filters, or selections. Supports Filled and Outlined style variants with Enabled, Hover, Pressed, and Disabled states. Includes optional leading icon and removable cancel button.",argDescriptions:{label:"Text displayed on the chip.",state:"Interaction state: enabled, hover, pressed, disabled.",variant:"Style variant: filled (solid background) or outlined (border-only).",hasLeftIcon:"Show/hide leading icon (Figma: Icon-L).",leftIconName:"Google Material Symbol name for the leading icon.",hasCancel:"Show/hide cancel/remove button (Figma: Cancel)."},variantDescriptions:{"hover/filled":"Hover filled: dark purple background (#352C63), white text."}},ve=["enabled","hover","pressed","disabled"],xe=["filled","outlined"],Se=["",...ge];var D,E,_,A,N,O;const Ae={title:"Components/Chip",component:g,tags:["autodocs"],parameters:{docs:{description:{component:o.componentDescription},page:()=>r.createElement(r.Fragment,null,r.createElement(pe,null),r.createElement(fe,{of:"meta"}),r.createElement(ue,null),r.createElement(me,null),r.createElement(he,{title:"Variants"}))}},argTypes:{state:n({name:"State",description:(D=o.argDescriptions)==null?void 0:D.state,control:{type:"select"},options:ve,labels:{enabled:"Enabled",hover:"Hover",pressed:"Pressed",disabled:"Disabled"}}),variant:n({name:"Variant",description:(E=o.argDescriptions)==null?void 0:E.variant,control:{type:"radio"},options:xe,labels:{filled:"Filled",outlined:"Outlined"}}),label:n({name:"Label",description:(_=o.argDescriptions)==null?void 0:_.label,control:{type:"text"}}),hasLeftIcon:n({name:"Has left icon",description:(A=o.argDescriptions)==null?void 0:A.hasLeftIcon,control:{type:"boolean"}}),leftIconName:n({name:"Left icon",description:(N=o.argDescriptions)==null?void 0:N.leftIconName,control:{type:"select"},options:Se,labels:{"":"None"}}),iconColor:n({name:"Icon colour",description:"Set icon colour (white, black, grey, blue, brand, green, red, yellow). Default inherits text.",control:{type:"select"},options:["","white","black","grey","blue","brand","green","red","yellow"]}),hasCancel:n({name:"Has cancel",description:(O=o.argDescriptions)==null?void 0:O.hasCancel,control:{type:"boolean"}}),onClick:w({control:!1}),onCancel:w({control:!1})}},l=i=>r.createElement(g,{...i}),s={label:"Chip",state:"enabled",variant:"filled",hasLeftIcon:!0,leftIconName:"dark_mode",hasCancel:!0},c={render:l,name:"Filled",args:{...s,variant:"filled"}},d={render:l,name:"Outlined",args:{...s,variant:"outlined"}};var k;const p={render:l,name:"Hover",parameters:{docs:{description:{story:(k=o.variantDescriptions)==null?void 0:k["hover/filled"]}}},args:{...s,state:"hover"}},f={render:l,name:"Pressed",args:{...s,state:"pressed"}},u={render:l,name:"Disabled",args:{...s,state:"disabled"}},m={render:l,name:"Without icon",args:{...s,hasLeftIcon:!1}},h={render:l,name:"Without cancel",args:{...s,hasCancel:!1}};var R,P,V;c.parameters={...c.parameters,docs:{...(R=c.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Filled',
  args: {
    ...BASE_ARGS,
    variant: 'filled'
  }
}`,...(V=(P=c.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var F,L,T;d.parameters={...d.parameters,docs:{...(F=d.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Outlined',
  args: {
    ...BASE_ARGS,
    variant: 'outlined'
  }
}`,...(T=(L=d.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var B,G,H;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Hover',
  parameters: {
    docs: {
      description: {
        story: figmaDocs.variantDescriptions?.['hover/filled']
      }
    }
  },
  args: {
    ...BASE_ARGS,
    state: 'hover'
  }
}`,...(H=(G=p.parameters)==null?void 0:G.docs)==null?void 0:H.source}}};var q,W,$;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Pressed',
  args: {
    ...BASE_ARGS,
    state: 'pressed'
  }
}`,...($=(W=f.parameters)==null?void 0:W.docs)==null?void 0:$.source}}};var j,M,z;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Disabled',
  args: {
    ...BASE_ARGS,
    state: 'disabled'
  }
}`,...(z=(M=u.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var J,K,Q;m.parameters={...m.parameters,docs:{...(J=m.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Without icon',
  args: {
    ...BASE_ARGS,
    hasLeftIcon: false
  }
}`,...(Q=(K=m.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,X,Y;h.parameters={...h.parameters,docs:{...(U=h.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Without cancel',
  args: {
    ...BASE_ARGS,
    hasCancel: false
  }
}`,...(Y=(X=h.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const Ne=["Filled","Outlined","Hover","Pressed","Disabled","WithoutIcon","WithoutCancel"];export{u as Disabled,c as Filled,p as Hover,d as Outlined,f as Pressed,h as WithoutCancel,m as WithoutIcon,Ne as __namedExportsOrder,Ae as default};
