import React from "react"
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Dashboard from "../../component/dashboard";
import Login from "../../component/login";
import Signup from "../../component/signup";
import Profile from "../../component/profile";
import File from "../../component/file";
import Folder from "../../component/folder";
import Favourites from "../../component/favourites";
import ForgotPassword from "../../component/forgotpwd";
import NavBar from "../../component/navbar";
import UpdateProfile from "../../component/updateprofile";
import FolderPath from "../../component/path";

const firebase = require('@firebase/testing')
const MY_PROJECT_ID = "digital-course-file"

function getFirebaseTest() {
    return firebase.initializeTestApp({
        projectId: MY_PROJECT_ID,
        auth : {uid: "test", email: "test@gmail.com"}
    })
}
describe("Unit Testing",()=>{
    describe("Dashboard", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Dashboard component rendering", () => {
            shallow(<Dashboard/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<Dashboard/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Login", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Login component rendering", () => {
            shallow(<Login/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<Login/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Signup", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Signup component rendering", () => {
            shallow(<Signup/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<Signup/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Profile", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Profile component rendering", () => {
            shallow(<Profile/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<Profile/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("File", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("File component rendering", () => {
            shallow(<File/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<File/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Folder", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Folder component rendering", () => {
            shallow(<Folder/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<Folder/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Favourites", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Favourites component rendering", () => {
            shallow(<Favourites/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<Favourites/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Forgot Password", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Forgot Password component rendering", () => {
            shallow(<ForgotPassword/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<ForgotPassword/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Navigation bar", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Navbar component rendering", () => {
            shallow(<NavBar/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<NavBar/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Update Profile", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Update Profile component rendering", () => {
            shallow(<UpdateProfile/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<UpdateProfile/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });

    describe("Path", () => {
        Enzyme.configure({adapter: new Adapter()});
        it("Path component rendering", () => {
            shallow(<FolderPath/>);
        });
        it("Proper details must be rendered", () => {
            const component = shallow(<FolderPath/>);
            expect(component.getElements()).toMatchSnapshot();
        });
    });
})


describe("Integration testing with Firebase Test suite", () => {
    describe("Accessing data from the cloud", () => {
        describe("Accessible",()=>{
            it("Can Open folders of current user", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("folder").doc("test")
                firebase.assertSucceeds(testDoc.get())
            })
            it("Can Open Files of current user", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("files").doc("test")
                firebase.assertSucceeds(testDoc.get())
            })
            it("Can access user profile of current user if id is same as user id", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("users").doc("test")
                firebase.assertSucceeds(testDoc.get())
            })
        })
        describe("Not accessible",()=>{
            it("Can't access someone else's folders", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("folders").doc("abc")
                firebase.assertFails(testDoc.get())
            })
            it("Can't access someone else's files", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("files").doc("abc")
                firebase.assertFails(testDoc.get())
            })
            it("Can't access someone else's user profile", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("users").doc("abc")
                firebase.assertFails(testDoc.get())
            })
        })
    })
    describe("Adding new data or modifying data", () => {
        describe("Allowed",()=>{
            it("Can write to folders collection if id is same as user id", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("folders").doc("test")
                firebase.assertSucceeds(testDoc.set({a: "b"}))
            })
            it("Can write to files collection if id is same as user id", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("files").doc("test")
                firebase.assertSucceeds(testDoc.set({a: "b"}))
            })
            it("Can write to users collection if id is same as user id", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("users").doc("test")
                firebase.assertSucceeds(testDoc.set({a: "b"}))
            })
        })
        describe("Not permitted",()=>{
            it("Can't write to folders collection if id is not same as user id", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("folders").doc("abc")
                firebase.assertFails(testDoc.set({a: "b"}))
            })
            it("Can't write to files collection if id is not same as user id", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("files").doc("abc")
                firebase.assertFails(testDoc.set({a: "b"}))
            })
            it("Can't write to users collection if id is not same as user id", () => {
                const db = getFirebaseTest().firestore()
                const testDoc = db.collection("users").doc("abc")
                firebase.assertFails(testDoc.set({a: "b"}))
            })
        })
        
    })
})