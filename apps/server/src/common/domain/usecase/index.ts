/**
 * @see [Better Software Design with Application Layer Use Cases](https://khalilstemmler.com/articles/enterprise-typescript-nodejs/application-layer-use-cases/)
 */
 export abstract class Usecase<IRequest, IReply> {
	abstract execute(input: IRequest): Promise<IReply>;
  }
