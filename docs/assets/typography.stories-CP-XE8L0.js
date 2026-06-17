import{R as e}from"./iframe-BS0JH9Ka.js";import"./preload-helper-C1FmrZbK.js";const x=[10,12,14,16,18,21,24,28,36,48,60,96],b=[{name:"Regular",token:"--font-weight-regular",value:400},{name:"Medium",token:"--font-weight-medium",value:500},{name:"Semibold",token:"--font-weight-semibold",value:600}],W=[{name:"Noto Sans",token:"--font-family-noto-sans"},{name:"Rubik",token:"--font-family-rubik"}],r=({label:n,style:S})=>e.createElement("div",{style:{display:"flex",alignItems:"baseline",gap:16,marginBottom:8,padding:"4px 0",borderBottom:"1px solid var(--color-mono-100)"}},e.createElement("span",{style:{minWidth:80,fontSize:11,color:"var(--color-mono-500)",fontFamily:"monospace"}},n),e.createElement("span",{style:S},"The quick brown fox jumps over the lazy dog")),F={title:"Styles/Typography",parameters:{layout:"padded",docs:{page:null}}},t={render:()=>e.createElement("div",{style:{padding:24,fontFamily:"var(--font-family-base)"}},e.createElement("h2",{style:{marginTop:0}},"Type scale"),x.map(n=>e.createElement(r,{key:n,label:`${n}px`,style:{fontSize:n,lineHeight:1.3,fontFamily:"var(--font-family-base)"}})))},a={render:()=>e.createElement("div",{style:{padding:24,fontFamily:"var(--font-family-base)"}},e.createElement("h2",{style:{marginTop:0}},"Font weights — 16px"),b.map(n=>e.createElement(r,{key:n.name,label:n.name,style:{fontSize:16,fontWeight:n.value,fontFamily:"var(--font-family-base)"}})))},o={render:()=>e.createElement("div",{style:{padding:24}},e.createElement("h2",{style:{marginTop:0,fontFamily:"var(--font-family-base)"}},"Font families — 16px / Regular"),W.map(n=>e.createElement(r,{key:n.name,label:n.name,style:{fontSize:16,fontWeight:400,fontFamily:`var(${n.token})`}})))},i={render:()=>e.createElement("div",{style:{padding:24,fontFamily:"var(--font-family-base)"}},e.createElement("h1",{style:{fontSize:48,fontWeight:600,margin:"0 0 8px"}},"Heading 1 — 48px Semibold"),e.createElement("h2",{style:{fontSize:36,fontWeight:600,margin:"0 0 8px"}},"Heading 2 — 36px Semibold"),e.createElement("h3",{style:{fontSize:28,fontWeight:600,margin:"0 0 8px"}},"Heading 3 — 28px Semibold"),e.createElement("h4",{style:{fontSize:21,fontWeight:500,margin:"0 0 8px"}},"Heading 4 — 21px Medium"),e.createElement("p",{style:{fontSize:16,fontWeight:400,lineHeight:1.5,maxWidth:600,margin:"0 0 16px"}},"Body — 16px Regular. Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values in order to maintain a scalable and consistent visual system."),e.createElement("p",{style:{fontSize:14,fontWeight:400,lineHeight:1.5,maxWidth:600,margin:"0 0 16px",color:"var(--color-mono-700)"}},"Small body — 14px Regular. Used for secondary content, metadata, and supporting text that doesn't need the same visual weight as the primary body copy."),e.createElement("p",{style:{fontSize:12,fontWeight:400,lineHeight:1.5,maxWidth:600,margin:0,color:"var(--color-mono-500)"}},"Caption — 12px Regular. Reserved for labels, footnotes, and other tertiary content."))};var l,s,m;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 24,
    fontFamily: 'var(--font-family-base)'
  }}>\r
      <h2 style={{
      marginTop: 0
    }}>Type scale</h2>\r
      {SIZES.map(size => <TypeRow key={size} label={\`\${size}px\`} style={{
      fontSize: size,
      lineHeight: 1.3,
      fontFamily: 'var(--font-family-base)'
    }} />)}\r
    </div>
}`,...(m=(s=t.parameters)==null?void 0:s.docs)==null?void 0:m.source}}};var d,p,y;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 24,
    fontFamily: 'var(--font-family-base)'
  }}>\r
      <h2 style={{
      marginTop: 0
    }}>Font weights — 16px</h2>\r
      {WEIGHTS.map(w => <TypeRow key={w.name} label={w.name} style={{
      fontSize: 16,
      fontWeight: w.value,
      fontFamily: 'var(--font-family-base)'
    }} />)}\r
    </div>
}`,...(y=(p=a.parameters)==null?void 0:p.docs)==null?void 0:y.source}}};var f,g,c;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 24
  }}>\r
      <h2 style={{
      marginTop: 0,
      fontFamily: 'var(--font-family-base)'
    }}>Font families — 16px / Regular</h2>\r
      {FAMILIES.map(f => <TypeRow key={f.name} label={f.name} style={{
      fontSize: 16,
      fontWeight: 400,
      fontFamily: \`var(\${f.token})\`
    }} />)}\r
    </div>
}`,...(c=(g=o.parameters)==null?void 0:g.docs)==null?void 0:c.source}}};var h,u,v;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    padding: 24,
    fontFamily: 'var(--font-family-base)'
  }}>\r
      <h1 style={{
      fontSize: 48,
      fontWeight: 600,
      margin: '0 0 8px'
    }}>Heading 1 — 48px Semibold</h1>\r
      <h2 style={{
      fontSize: 36,
      fontWeight: 600,
      margin: '0 0 8px'
    }}>Heading 2 — 36px Semibold</h2>\r
      <h3 style={{
      fontSize: 28,
      fontWeight: 600,
      margin: '0 0 8px'
    }}>Heading 3 — 28px Semibold</h3>\r
      <h4 style={{
      fontSize: 21,
      fontWeight: 500,
      margin: '0 0 8px'
    }}>Heading 4 — 21px Medium</h4>\r
      <p style={{
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
      maxWidth: 600,
      margin: '0 0 16px'
    }}>\r
        Body — 16px Regular. Design tokens are the visual design atoms of the design system — specifically,\r
        they are named entities that store visual design attributes. We use them in place of hard-coded\r
        values in order to maintain a scalable and consistent visual system.\r
      </p>\r
      <p style={{
      fontSize: 14,
      fontWeight: 400,
      lineHeight: 1.5,
      maxWidth: 600,
      margin: '0 0 16px',
      color: 'var(--color-mono-700)'
    }}>\r
        Small body — 14px Regular. Used for secondary content, metadata, and supporting text that\r
        doesn&apos;t need the same visual weight as the primary body copy.\r
      </p>\r
      <p style={{
      fontSize: 12,
      fontWeight: 400,
      lineHeight: 1.5,
      maxWidth: 600,
      margin: 0,
      color: 'var(--color-mono-500)'
    }}>\r
        Caption — 12px Regular. Reserved for labels, footnotes, and other tertiary content.\r
      </p>\r
    </div>
}`,...(v=(u=i.parameters)==null?void 0:u.docs)==null?void 0:v.source}}};const k=["TypeScale","Weights","Families","Specimen"];export{o as Families,i as Specimen,t as TypeScale,a as Weights,k as __namedExportsOrder,F as default};
