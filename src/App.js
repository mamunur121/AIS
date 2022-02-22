import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Switch, Route, NavLink, Redirect} from 'react-router-dom'
import {fetchDomainsUrls} from "./utils/fetchUrls";
import RenderVulnerabilities from "./components/RenderVulnerabilities";
import Loading from "./components/Loading";

function App() {
  const [domains, setDomains] = useState([]);
  const [linkUrl, setLinkUrl] = useState([]);
  const vulnerabilities = ['XSS', 'SQLi', 'non-http only cookie', 'restVulnerabilities'];
  
  useEffect(()=> {
    fetchDomainsUrls('http://127.0.0.1:5000/domains')
      .then((data) => setDomains(data?.domains));
  }, []);

  useEffect(()=> {
    fetchDomainsUrls('http://127.0.0.1:5000/urls')
      .then((data) => setLinkUrl(data?.urls));
  }, []);
  const [
    XSSVulnerabilities,
    SQLiVulnerabilities,
    cookieVulnerabilities,
    restVulnerabilities
  ] = linkUrl && [linkUrl.slice(0, 6), linkUrl.slice(6, 12), linkUrl.slice(12, 18), linkUrl.slice(18, linkUrl.length - 1)];
  
  if (!domains || !linkUrl) <Loading />
  return (
    <Router>
      <div className='container'>
        <div className='navigation'>
          <h1 style={{
            textAlign: "center",
          }}>List of Domains</h1>
          <ul>
            {domains.map((item, index) => {
              const path = item.split('://')[1];
              return (
                <li key={item}>
                  <NavLink to={path} style={isActive => ({
                    color: isActive ? "green" : ""
                  })}>- {vulnerabilities[index]} on {item}</NavLink>
                </li>
              )
            })}
          </ul>
        </div>
        <div className='listItems'>
          <h3 style={{
            textAlign: "center",
          }}>Related Vulnerabilities List</h3>
          <Switch>
            <Route path='/example.org'>
              <DomainXSS XSSVulnerabilities={XSSVulnerabilities}/>
            </Route>
            <Route path='/www.example.org'>
              <DomainSQL SQLiVulnerabilities={SQLiVulnerabilities}/>
            </Route>
            <Route path='/auth.example.org'>
              <DomainCookie cookieVulnerabilities={cookieVulnerabilities}/>
            </Route>
            <Route path='/hopefullydoesnotexist.com'>
              <DomainRest restVulnerabilities={restVulnerabilities}/>
            </Route>
            <Route path='*'>
              <Redirect to='/example.org' />
            </Route>
          </Switch>
        </div>
        
      </div>
    </Router>
  );
}



const DomainXSS = ({XSSVulnerabilities}) =>
  <RenderVulnerabilities data={XSSVulnerabilities} className='renderItems'/>

const DomainSQL = ({SQLiVulnerabilities}) =>
  <RenderVulnerabilities data={SQLiVulnerabilities} className='renderItems'/>

const DomainCookie = ({ cookieVulnerabilities }) =>
  <RenderVulnerabilities data={cookieVulnerabilities} className='renderItems'/>

const DomainRest = ({ restVulnerabilities }) =>
  <RenderVulnerabilities data={restVulnerabilities} className='renderItems'/>

export default App;
