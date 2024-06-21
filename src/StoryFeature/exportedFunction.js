/* The code snippet you provided is exporting an array named `stories` containing objects. Each object
represents a story with properties like `type`, `image`, and `description`. The `type` property
indicates that the story is an image, while the `image` property holds the URL of the image
associated with the story. The `description` property provides a brief description or text related
to the image story. */
// you can change the data 
export const stories = [
  {
    type: 'image',
    image: 'https://picsum.photos/seed/picsum/200/300',
    description: "The placeholder text, beginning with the line “Lorem ipsum dolor sit amet, consectetur adipiscing elit”, looks like Latin because in its youth, centuries ago, it was Latin."
  },
  {
    type: 'image',
    image: 'https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ',
    description: "McClintock's eye for detail certainly helped narrow the whereabouts of lorem ipsum's origin, however, the “how and when” still remain something of a mystery, with competing theories and timelines."
  },
  {
    type: 'image',
    image: 'https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s',
    description: "As an alternative theory, (and because Latin scholars do this sort of thing) someone tracked down a 1914 Latin edition of De Finibus which challenges McClintock's 15th century claims "
  },
  {
    type: 'image',
    image: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
    description: "The decade that brought us Star Trek and Doctor Who also resurrected Cicero—or at least what used to be Cicero"
  },

];