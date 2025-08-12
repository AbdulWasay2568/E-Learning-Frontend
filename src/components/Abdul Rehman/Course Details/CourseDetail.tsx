import React, { useState, useEffect} from 'react'
import ReactPlayer from 'react-player'
import './coursedetail.css'
import { useParams } from 'react-router-dom';
import { ChevronDown, ChevronUp, Cross } from "lucide-react";
import myimage from '../../../assets/Images/Chapters/first.webp';

interface myallcourses{
  chapterNo: number;
  chapterName: string;
  description: string;
}

interface about{
  name:string;
  about:string;
}
const CourseDetail:React.FC = () => {

  const {id} = useParams(); 

  let chapters: myallcourses[] = [];

    if (id === "WebDevelopment") {
  chapters = [
    { chapterNo: 1, chapterName: "HTML Basics", description: "Introduction to HTML structure and tags." },
    { chapterNo: 2, chapterName: "CSS Styling", description: "Learn how to style your web pages with CSS." },
    { chapterNo: 3, chapterName: "JavaScript Essentials", description: "Make your pages interactive with JavaScript." },
    { chapterNo: 4, chapterName: "Responsive Design", description: "Make your website mobile-friendly with media queries." },
    { chapterNo: 5, chapterName: "DOM Manipulation", description: "Interact with the DOM using JavaScript." },
    { chapterNo: 6, chapterName: "Web Forms & Validation", description: "Create and validate user input forms." },
    { chapterNo: 7, chapterName: "Intro to APIs", description: "Fetch external data using APIs." }
  ];
}

else if (id === "MobileApp") {
  chapters = [
    { chapterNo: 1, chapterName: "Introduction to Mobile Apps", description: "Overview of mobile platforms and development approaches." },
    { chapterNo: 2, chapterName: "React Native Basics", description: "Start building apps using React Native." },
    { chapterNo: 3, chapterName: "Navigation in Mobile Apps", description: "Handle screen navigation in mobile apps." },
    { chapterNo: 4, chapterName: "Working with APIs", description: "Connect your app to real-world data using REST APIs." },
    { chapterNo: 5, chapterName: "State Management", description: "Manage data using hooks and context." },
    { chapterNo: 6, chapterName: "Styling Mobile Interfaces", description: "Use StyleSheet and UI libraries for clean UI." },
    { chapterNo: 7, chapterName: "App Publishing", description: "Publish your app to Play Store or App Store." }
  ];
}

else if (id === "Cloud") {
  chapters = [
    { chapterNo: 1, chapterName: "Introduction to Cloud", description: "What is cloud computing and why it matters?" },
    { chapterNo: 2, chapterName: "Types of Cloud Services", description: "Understand IaaS, PaaS, and SaaS models." },
    { chapterNo: 3, chapterName: "Cloud Deployment Models", description: "Explore public, private, and hybrid clouds." },
    { chapterNo: 4, chapterName: "Virtual Machines & Containers", description: "Run applications in isolated environments." },
    { chapterNo: 5, chapterName: "Cloud Storage Solutions", description: "Learn about object and block storage in the cloud." },
    { chapterNo: 6, chapterName: "Security in the Cloud", description: "Keep your cloud apps and data secure." },
    { chapterNo: 7, chapterName: "Intro to AWS, Azure, GCP", description: "Overview of popular cloud providers." }
  ];
}

else if (id === "Frontend") {
  chapters = [
    { chapterNo: 1, chapterName: "Frontend Overview", description: "What is frontend development?" },
    { chapterNo: 2, chapterName: "HTML Deep Dive", description: "Advanced HTML techniques for structure." },
    { chapterNo: 3, chapterName: "CSS Flexbox & Grid", description: "Build complex layouts easily." },
    { chapterNo: 4, chapterName: "JavaScript DOM & Events", description: "Interact with the page using JS." },
    { chapterNo: 5, chapterName: "React Basics", description: "Introduction to components and JSX." },
    { chapterNo: 6, chapterName: "React Hooks", description: "Use state and lifecycle in function components." },
    { chapterNo: 7, chapterName: "Frontend Deployment", description: "Deploy frontend apps using Netlify or Vercel." }
  ];
}

else if (id === "UI UX") {
  chapters = [
    { chapterNo: 1, chapterName: "What is UI/UX?", description: "Understand the core principles of UI/UX design." },
    { chapterNo: 2, chapterName: "User Research", description: "Conduct surveys and interviews to understand users." },
    { chapterNo: 3, chapterName: "Wireframing", description: "Sketch the layout before you design." },
    { chapterNo: 4, chapterName: "Design Principles", description: "Learn about alignment, contrast, hierarchy, etc." },
    { chapterNo: 5, chapterName: "Prototyping Tools", description: "Use tools like Figma or Adobe XD." },
    { chapterNo: 6, chapterName: "User Testing", description: "Validate your designs with real users." },
    { chapterNo: 7, chapterName: "Handoff to Developers", description: "Prepare assets and guidelines for devs." }
  ];
}

let mydescription:about[] = [];

if (id === "WebDevelopment") {
  mydescription = [
    {
      name: "Web Development",
      about: `This comprehensive course is designed to take you from the basics of website creation to building complex, dynamic web applications. You'll begin with the fundamentals of HTML5, CSS3, and JavaScript, gradually moving on to front-end frameworks like React and backend technologies such as Node.js and Express. You'll also gain hands-on experience with database integration using MongoDB, Git version control, and modern development tools like VS Code and Postman. By the end of the course, you’ll be equipped to build, deploy, and maintain full-stack web applications, making you job-ready in the rapidly growing field of web development.`
    }
  ];
} else if (id === "MobileApp") {
  mydescription = [
    {
      name: "Mobile App Development",
      about: `This course is tailored for those looking to dive into the world of cross-platform mobile application development. Starting from core programming concepts, you'll explore tools like React Native and Flutter to build apps for both Android and iOS platforms using a single codebase. You'll learn how to design intuitive user interfaces, integrate APIs, manage state efficiently using tools like Redux or Provider, and connect your apps to cloud-based backends like Firebase. The course also covers testing, debugging, and publishing apps to the Google Play Store and Apple App Store. By the end, you'll be able to create responsive, secure, and performance-optimized mobile apps for real-world use cases.`
    }
  ];
} else if (id === "Cloud") {
  mydescription = [
    {
      name: "Cloud Fundamentals",
      about: `This foundational course introduces you to the core concepts of cloud computing and its practical applications in today’s IT infrastructure. You’ll learn about key cloud service models (IaaS, PaaS, SaaS), deployment types (public, private, hybrid), and leading cloud providers such as AWS, Microsoft Azure, and Google Cloud Platform. The course also covers virtual machines, containers, cloud storage, and networking basics. Real-world scenarios will teach you how to provision resources, manage cloud security, and ensure scalability and reliability. Perfect for beginners and IT professionals transitioning to the cloud, this course lays the groundwork for further specialization in cloud architecture, DevOps, or cloud security.`
    }
  ];
} else if (id === "Frontend") {
  mydescription = [
    {
      name: "Frontend Development",
      about: `This specialized course focuses on the design and implementation of highly interactive and responsive user interfaces. You’ll begin with the basics of HTML, CSS, and JavaScript, and quickly move into modern front-end libraries and frameworks such as React, Vue, or Angular. The course emphasizes component-based architecture, state management (e.g., Redux, Context API), and advanced styling techniques using Tailwind CSS or Styled Components. You’ll also learn about performance optimization, responsive design principles, accessibility standards, and testing strategies. By the end of this course, you'll be proficient in creating elegant, scalable, and maintainable front-end applications that deliver seamless user experiences.`
    }
  ];
} else if (id === "UI UX") {
  mydescription = [
    {
      name: "UI/UX Design",
      about: `This immersive course is crafted to teach you the principles and practical skills required to design intuitive, aesthetically pleasing, and user-centered digital experiences. You'll explore key areas including user research, persona development, wireframing, prototyping, and usability testing. The course introduces industry-standard tools like Figma, Adobe XD, and Sketch, while teaching you to apply core design principles such as layout, typography, color theory, and interaction design. You'll also gain insights into creating responsive designs, working with developers, and conducting A/B testing to validate design decisions. By the end of the course, you will be equipped to create compelling user interfaces that not only look great but also solve real user problems.`
    }
  ];
} else {
  mydescription = [
    {
      name: "Unknown Course",
      about: "No course information available for the selected ID."
    }
  ];
}

  const [activeChapter, setActiveChapter] = useState<number| null>(null);
  const myToggle = (chapterNo: number) =>{
    setActiveChapter(e => e === chapterNo ? null : chapterNo);
  }

 
  const [highlight, setHighlight] = useState<number| null>(null);
    const myEqualizer = (chapterNo: number) =>{
    setHighlight(e => e === chapterNo ? null : chapterNo);
  }

  const [heights, setHeights] = useState([5, 7, 9, 2]);

useEffect(() => {
  if (highlight !== null) { 
    const interval = setInterval(() => {
      setHeights(h => h.map(() => 5 + Math.random() * 10));
    }, 200);
    return () => clearInterval(interval);
  }
}, [highlight]); 

// show or not
const [forceShow, setForceShow] = useState<boolean>(false);

const showAbout = () =>{
  setForceShow(!forceShow);
}
 
  return (
    <div className='container mx-auto px-4 mainDiv'>

  {/* first div */}
      <div className='firstdiv'>
        {/* youtubeplayer div */}
        <div className="myYoutubePLayer">
          <ReactPlayer src='https://www.youtube.com/watch?v=LXb3EKWsInQ'
          width="100%" height="100%" controls={true} muted={true} 
          autoPlay={true}
          />
        </div>

        {/* about div */}
     {mydescription.map((e)=>(
        <div className={forceShow?'aboutdiv':'nodiv'}>
         
          <h3 className='heading'>{e.name} Course</h3>
          <h2 className='secondheading'>About Course</h2>
          <p>{e.about}</p>
          
        </div>
        ))}
      </div>


          {/* second div */}
      <div className='seconddiv'>
        <div className="cross" >
          <Cross onClick={()=>showAbout()} className={forceShow?'nocross':'mycross'}/>
        </div>
        <div className={forceShow?'playlist':'noplaylist'} onClick={()=>showAbout()}>
              <div><p style={{fontSize:"18px", fontWeight:'500'}}>Show Playlist</p></div>
                
                <div> <ChevronUp className='cross'/> </div>
            </div>
        
          {chapters.map((e) => {
          const active = activeChapter === e.chapterNo;
          const equalizer = highlight === e.chapterNo;
          
         
        
          
          return (
            
         <div className={`${active ? 'sections' : 'newfeature'} ${forceShow ? 'showNothing' : 'playlist'}`} key={e.chapterNo} >
          
          <div className="mychaptersection">
            <div className="chapters">
              
              {/* div */}
              <div className="myimagediv" onClick={()=>myEqualizer(e.chapterNo)}>
                <img src={myimage} alt="chapter" className='myImage' />
              </div>
              <div className="div">
                <h3 className='myheading' onClick={()=>myEqualizer(e.chapterNo)}>Chapter {e.chapterNo}: {e.chapterName}</h3>
              </div>
              

              <div className= {equalizer?'equalizer':'notequalizer'}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="bar"
          style={{ height: `${h}px` }}
        ></div>
      ))}
    </div>
                    
                    
            </div>
                  <div className="chapterDescription">
                    <ChevronDown onClick={()=>myToggle(e.chapterNo)}className={active? 'chaveron' :'rotatechaveron'}/>
                  </div>
                  
          </div>
            
            <p className={active ? 'showDescription' : 'hideDescription'}>{e.description}</p>
                  
                
                  
          
         </div>
         )})}
      </div>
       
      
    </div>
  )
}

export default CourseDetail;
