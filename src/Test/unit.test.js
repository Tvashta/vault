import React from "react"
import {shallow} from "enzyme"
import Dashboard from "../components/dashboard";
describe("Dashboard",()=>{
    it("Should render my component",()=>{
        const wrapper = shallow(<Dashboard/>);

    })
})