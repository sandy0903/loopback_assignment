import { createBindingFromClass } from "@loopback/core";
import { cronJob, CronJob } from "@loopback/cron";
import { repository } from "@loopback/repository";
import { isEmpty } from "lodash";
import { TaskStatus } from "../enums/task";
import { Task } from "../models";
import { TaskRepository } from "../repositories";
// import { TaskStatus } from ""

@cronJob()
class CleanTask extends CronJob {
    constructor(
        @repository(TaskRepository)
        public taskRepository:TaskRepository
    ){
        super({
            name:"clean task cronjob",
            onTick:async ()=>{
                console.log("running cronjob");
                await cleanDoneTask(taskRepository)
            },
            cronTime:"* 1 * * * *",
            timeZone:"Asia/Ho_Chi_Minh",
            start:true,
            runOnInit:true,

        })
    }
}


const cleanTaskBinding=createBindingFromClass(CleanTask);


export default cleanTaskBinding;

async function cleanDoneTask(taskRepository:TaskRepository){

    let page=0;
    const pageSize=2;
    let tasks:Task[]=[];
    const updateStatusTask:Task[]=[];
    try {
        while (!isEmpty(tasks)||page===0){
            tasks=await taskRepository.find({
                where:{
                    status:TaskStatus.DONE,
                },
                skip:page*pageSize,
                limit:pageSize,
            });
            updateStatusTask.push(...tasks);
            page++
        }
        await Promise.all(
            updateStatusTask.map(item=>taskRepository.deleteById(item.id))
        );
        console.log("Cronjob: Cleaning task is done ")
    } catch (error) {
        console.log('Cronjob: Clean task is failed')

    }
}