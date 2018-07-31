/**
 * Created by PhpStorm.
 * User: Tran Huy Tiep
 * Date: 27 07 2018
 * Time: 2:58 PM
 */
import {connectMysql} from "../config/dbConnect";
import * as Mongoose from "mongoose"

export class QueryMysql extends connectMysql{
    protected table: string;

    constructor(table: string){
        super();
        this.table = table;
    }
    /**
     * lay thong tin cua mot bang
     * @param {string} condition
     * @returns {Promise<any>}
     */
    public getData( condition ?: string) : Promise<any>{
        let Condition = condition || " 1";
        let sql: string = `SELECT * FROM ${this.table} WHERE ${Condition}`;

        return super.query(sql);
    };

    /**
     * them du lieu vao bang
     * @param {Object} data
     * @returns {Promise<any>}
     */
    public async insertData(data: Array<Object>| Object): Promise<any>{
        let sqlResetIndex: string = `ALTER TABLE ${this.table} AUTO_INCREMENT = 1`;
        let sqlInsert: string = `INSERT INTO ${this.table} SET ? `;

        try {
            await super.query(sqlResetIndex);
            return await super.query(sqlInsert, data);
        }catch (e) {
            throw (e);
        };
    };

    /**
     * update du lieu vao bang
     * @param {Object} data
     * @param {string} condition
     * @returns {Promise<any>}
     */
    public updateData(data: Object, condition : string): Promise<any>{
        let sql = `UPDATE ${this.table} SET ? WHERE ${condition}`;

        return super.query(sql, data);
    };

    /**
     * delete du lieu cua mot bang
     * @param {string} data
     * @param {string} condition
     * @returns {Promise<any>}
     */
    public deleteData(data: string, condition : string): Promise<any>{
        let sql = `DELETE FROM ${this.table} WHERE ${condition}`

        return super.query(sql, data);
    };
}

export class QueryMongoodb {
    protected model: Mongoose.Model<Mongoose.Document>;

    constructor(schema: Mongoose.Model<Mongoose.Document>){
        this.model = schema;
    }

    /**
     * get data
     * @param {object} condition
     * @param {object} getList
     * @returns {Promise<any>}
     */
    public getData(condition: object, getList ?: object) {
        const promise = new Promise((resolve, reject) => {
            this.model
                .find(condition)
                .select(getList)
                .exec(function (error, users) {
                    if (error) {
                        resolve(error);
                    } else {
                        reject(users);
                    }
                });
        });

        return promise;
    }

    /**
     * insert data
     * @param {object} data
     * @returns {Promise<any>}
     */
    public save(data: object) {
        const promise = new Promise((resolve, reject) => {
            let dataSave = new this.model(data);
            dataSave.save(function(err, result){
                if(err){
                    reject(err);

                }else{
                    resolve(result);
                }
            });
        });

        return promise;
    };

    /**
     * update data by condition
     * @param {object} condition
     * @param {object} data
     * @returns {Promise<any>}
     */
    public update(condition: object, data: object) {
        const promise = new Promise((resolve, reject) => {

            this.model.update(condition, data, function (err, result) {
                    if (err) {
                        resolve(err);
                    } else {
                        reject(result);
                    }
                });

        });

        return promise;
    };

    /**
     * remove data by condition
     * @param {object} condition
     * @returns {Promise<any>}
     */
    public remove(condition: object) {
        const promise = new Promise((resolve, reject) => {
            this.model.remove(condition, function (error) {
                if (error) {
                    resolve(error);
                } else {
                    reject(true);
                }
            });
        });

        return promise;
    };
}
