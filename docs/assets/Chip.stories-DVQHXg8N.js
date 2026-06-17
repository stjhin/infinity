import{R as n}from"./iframe-BCz922t-.js";import{t as e,i as pe,e as w,p as t}from"./controlGroups-BrjsdoFJ.js";import{g as fe}from"./googleIconNames-Bon9gHIP.js";import"./preload-helper-C1FmrZbK.js";function g({label:c="Chip",state:b="enabled",variant:v="filled",hasLeftIcon:Z=!0,hasCancel:ee=!0,iconColor:x,leftIconName:S="dark_mode",onClick:C,onCancel:I,disabled:re=!1,className:oe="",...ae}){const a=re||b==="disabled",y=x!=null?pe(x):null,te=(()=>{const r=v==="filled";return a?{"--chip-bg":e("color.asx-mono.200","#b6c2cf"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:b==="pressed"?r?{"--chip-bg":e("color.asx-purple.1000","#2b273f"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:{"--chip-bg":e("color.asx-purple.200","#dfd8fd"),"--chip-border-color":e("color.asx-purple.800","#5e4db2"),"--chip-border-width":"2px","--chip-text-color":e("color.asx-purple.800","#5e4db2"),"--chip-icon-color":e("color.asx-purple.800","#5e4db2")}:b==="hover"?r?{"--chip-bg":e("color.asx-purple.900","#352c63"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:{"--chip-bg":e("color.asx-purple.200","#dfd8fd"),"--chip-border-color":e("color.asx-purple.800","#5e4db2"),"--chip-border-width":"1px","--chip-text-color":e("color.asx-purple.800","#5e4db2"),"--chip-icon-color":e("color.asx-purple.800","#5e4db2")}:r?{"--chip-bg":e("color.asx-purple.800","#5e4db2"),"--chip-border-color":"transparent","--chip-border-width":"0px","--chip-text-color":e("global.text.white","#ffffff"),"--chip-icon-color":e("global.text.white","#ffffff")}:{"--chip-bg":e("global.bg.white","#ffffff"),"--chip-border-color":e("color.asx-purple.800","#5e4db2"),"--chip-border-width":"1px","--chip-text-color":e("color.asx-purple.800","#5e4db2"),"--chip-icon-color":e("color.asx-purple.800","#5e4db2")}})(),ne=["chip",`chip--${v}`,a?"chip--disabled":"",oe],{style:le,...se}=ae||{},ce={...te,...y?{"--chip-icon-color":y}:{},...le||{}},ie=r=>{a||C&&C(r)},de=r=>{r.stopPropagation(),!a&&I&&I(r)};return n.createElement("div",{className:ne.filter(Boolean).join(" "),style:ce,onClick:ie,role:"button","aria-disabled":a||void 0,tabIndex:a?-1:0,...se},Z&&S&&n.createElement("span",{className:"chip__icon","aria-hidden":!0},n.createElement("span",{className:"material-symbols-rounded"},S)),n.createElement("span",{className:"chip__label"},c),ee&&n.createElement("span",{className:"chip__cancel","aria-label":`Remove ${c}`,role:"button",onClick:de,tabIndex:a?-1:0},n.createElement("span",{className:"material-symbols-rounded"},"close")))}g.__docgenInfo={description:"",methods:[],displayName:"Chip",props:{label:{defaultValue:{value:"'Chip'",computed:!1},required:!1},state:{defaultValue:{value:"'enabled'",computed:!1},required:!1},variant:{defaultValue:{value:"'filled'",computed:!1},required:!1},hasLeftIcon:{defaultValue:{value:"true",computed:!1},required:!1},hasCancel:{defaultValue:{value:"true",computed:!1},required:!1},leftIconName:{defaultValue:{value:"'dark_mode'",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1},className:{defaultValue:{value:"''",computed:!1},required:!1}}};const o={generatedAt:new Date().toISOString(),componentDescription:"A compact chip/tag component for displaying labels, filters, or selections. Supports Filled and Outlined style variants with Enabled, Hover, Pressed, and Disabled states. Includes optional leading icon and removable cancel button.",argDescriptions:{label:"Text displayed on the chip.",state:"Interaction state: enabled, hover, pressed, disabled.",variant:"Style variant: filled (solid background) or outlined (border-only).",hasLeftIcon:"Show/hide leading icon (Figma: Icon-L).",leftIconName:"Google Material Symbol name for the leading icon.",hasCancel:"Show/hide cancel/remove button (Figma: Cancel)."},variantDescriptions:{"hover/filled":"Hover filled: dark purple background (#352C63), white text."}},ue=["enabled","hover","pressed","disabled"],he=["filled","outlined"],me=["",...fe];var _,D,A,E,N,O;const Ce={title:"Components/Chip",component:g,tags:["autodocs"],parameters:{docs:{description:{component:o.componentDescription}}},argTypes:{state:t({name:"State",description:(_=o.argDescriptions)==null?void 0:_.state,control:{type:"select"},options:ue,labels:{enabled:"Enabled",hover:"Hover",pressed:"Pressed",disabled:"Disabled"}}),variant:t({name:"Variant",description:(D=o.argDescriptions)==null?void 0:D.variant,control:{type:"radio"},options:he,labels:{filled:"Filled",outlined:"Outlined"}}),label:t({name:"Label",description:(A=o.argDescriptions)==null?void 0:A.label,control:{type:"text"}}),hasLeftIcon:t({name:"Has left icon",description:(E=o.argDescriptions)==null?void 0:E.hasLeftIcon,control:{type:"boolean"}}),leftIconName:t({name:"Left icon",description:(N=o.argDescriptions)==null?void 0:N.leftIconName,control:{type:"select"},options:me,labels:{"":"None"}}),iconColor:t({name:"Icon colour",description:"Set icon colour (white, black, grey, blue, brand, green, red, yellow). Default inherits text.",control:{type:"select"},options:["","white","black","grey","blue","brand","green","red","yellow"]}),hasCancel:t({name:"Has cancel",description:(O=o.argDescriptions)==null?void 0:O.hasCancel,control:{type:"boolean"}}),onClick:w({control:!1}),onCancel:w({control:!1})}},l=c=>n.createElement(g,{...c}),s={label:"Chip",state:"enabled",variant:"filled",hasLeftIcon:!0,leftIconName:"dark_mode",hasCancel:!0},i={render:l,name:"Filled",args:{...s,variant:"filled"}},d={render:l,name:"Outlined",args:{...s,variant:"outlined"}};var k;const p={render:l,name:"Hover",parameters:{docs:{description:{story:(k=o.variantDescriptions)==null?void 0:k["hover/filled"]}}},args:{...s,state:"hover"}},f={render:l,name:"Pressed",args:{...s,state:"pressed"}},u={render:l,name:"Disabled",args:{...s,state:"disabled"}},h={render:l,name:"Without icon",args:{...s,hasLeftIcon:!1}},m={render:l,name:"Without cancel",args:{...s,hasCancel:!1}};var R,L,P;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Filled',
  args: {
    ...BASE_ARGS,
    variant: 'filled'
  }
}`,...(P=(L=i.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var V,B,F;d.parameters={...d.parameters,docs:{...(V=d.parameters)==null?void 0:V.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Outlined',
  args: {
    ...BASE_ARGS,
    variant: 'outlined'
  }
}`,...(F=(B=d.parameters)==null?void 0:B.docs)==null?void 0:F.source}}};var G,H,q;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(q=(H=p.parameters)==null?void 0:H.docs)==null?void 0:q.source}}};var T,W,$;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(z=(M=u.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var J,K,Q;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Without icon',
  args: {
    ...BASE_ARGS,
    hasLeftIcon: false
  }
}`,...(Q=(K=h.parameters)==null?void 0:K.docs)==null?void 0:Q.source}}};var U,X,Y;m.parameters={...m.parameters,docs:{...(U=m.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: renderChip,
  name: 'Without cancel',
  args: {
    ...BASE_ARGS,
    hasCancel: false
  }
}`,...(Y=(X=m.parameters)==null?void 0:X.docs)==null?void 0:Y.source}}};const Ie=["Filled","Outlined","Hover","Pressed","Disabled","WithoutIcon","WithoutCancel"];export{u as Disabled,i as Filled,p as Hover,d as Outlined,f as Pressed,m as WithoutCancel,h as WithoutIcon,Ie as __namedExportsOrder,Ce as default};
