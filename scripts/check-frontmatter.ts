import Joi from 'joi';
import matter from 'gray-matter';

const [, , ...blogs] = process.argv;

const schema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  locale: Joi.string().required().valid('fr', 'en'),
  alternate: Joi.string()
    .required()
    .pattern(/^\/blog\/[a-z-]+$/),
  isPublished: Joi.boolean().required(),
  publishedAt: Joi.when('isPublished', {
    is: true,
    then: Joi.string().required().isoDate(),
  }),
  tags: Joi.array().items(Joi.string()).required(),
});

blogs.forEach(async (blog) => {
  const { data } = matter.read(blog);
  const { error } = schema.validate(data);

  if (error) {
    console.log(error);
    process.exit(1);
  }
});
